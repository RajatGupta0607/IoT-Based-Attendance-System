/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import mqtt from "mqtt";
import { db } from "./db";
import { env } from "../env.js";

const client = mqtt.connect({
  host: env.MQTT_HOST,
  port: env.MQTT_PORT,
  username: env.MQTT_USERNAME,
  password: env.MQTT_PASSWORD,
});

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("attendance/records");
});

client.on("message", async (topic, message) => {
  try {
    const parsedMessage = JSON.parse(message.toString());

    const entity = await db.entity.findUnique({
      where: { id: parsedMessage.studentId },
    });

    if (!entity?.id) {
      console.log("Student not found:", parsedMessage.studentId);
      client.publish("attendance/ack", "Attendance Denied");
      throw new Error("Student not found");
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
      `Attendance Recorded ${attendance.entity.name}`,
    );
  } catch (error) {
    console.error("Error parsing message:", error);
  }
});
