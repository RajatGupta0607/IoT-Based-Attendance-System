import mqtt from "mqtt";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import dotenv from "dotenv";

dotenv.config();

const db = new PrismaClient().$extends(withAccelerate());

const client = mqtt.connect({
  host: process.env.MQTT_HOST,
  port: Number(process.env.MQTT_PORT),
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  protocol: "mqtts",
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("attendance/records", (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log("Subscribed to topic: attendance/records");
    }
  });
});

client.on("message", async (topic, message) => {
  try {
    const parsedMessage = JSON.parse(message.toString());
    const { studentId } = parsedMessage;

    const entity = await db.entity.findUnique({
      where: { id: studentId },
    });

    if (!entity?.id) {
      console.log("Student not found:", parsedMessage.studentId);
      client.publish("attendance/ack", "Attendance Denied");
      return;
    }

    const existingAttendance = await db.attendance.findFirst({
      where: {
        userId: parsedMessage.studentId,
        AND: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      },
    });

    if (existingAttendance) {
      console.log("Attendance already recorded for student:", entity.name);
      client.publish("attendance/ack", "Attendance Already Recorded");
      return;
    }

    const attendance = await db.attendance.create({
      data: {
        userId: parsedMessage.studentId,
      },
      include: {
        entity: true,
      },
    });

    console.log("Attendance record saved:", attendance.entity.name);

    client.publish(
      "attendance/ack",
      `Attendance Recorded ${attendance.entity.name}`
    );
  } catch (error) {
    console.error("Error parsing message:", error);
  }
});
