import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { router } from "expo-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { AppRegistry } from "react-native";

export async function sendPushNotification(expoPushToken: string) {
  console.log("123", expoPushToken);

  const noti = [];
  noti.push(expoPushToken);
  const message = {
    to: "ExponentPushToken[JHYq3FF8-w7VHNgEqNpbfQ]",
    sound: "default",
    title: "title",
    body: "body",
    data: { screen: "/(tabs)/explore" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  // await fetch("http://192.168.1.31:2002/send-notification", {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Accept-encoding": "gzip, deflate",
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(message),
  // });
}
const HeadlessRun = async (taskData: any) => {
  console.log("Headless JS Task running", taskData);
  // Thực hiện kết nối WebSocket hoặc các tác vụ nền khác
  const socket = new SockJS(`http://192.168.1.31:8080/ws`);
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, (frame: any) => {
    console.log("Connected: " + frame);
    stompClient.subscribe(
      `/topic/notifications/officeadminsep490@gmail.com`,
      (message) => {
        try {
          sendPushNotification("expoPushToken");
        } catch (e) {
          console.log(e);
        }
      }
    );
  });

  // Đảm bảo bạn dọn dẹp tài nguyên nếu cần thiết
  return () => {
    if (stompClient) {
      stompClient.disconnect();
    }
  };
};

export default HeadlessRun;
