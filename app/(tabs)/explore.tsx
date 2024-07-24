import Pagination from "@/components/pagination";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useMemo, useState } from "react";
import { ADMIN, permissionObject } from "@/components/permissions";

type STATUS = "ADMIN" | "OFFICE_ADMIN" | "SALE" | "OFFICE_STAFF";

export default function TabTwoScreen() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<any>();
  const [statusContract, setStatusContract] = useState<any>({
    id: 1,
    title: "🗂️ Quản lí hợp đồng",
    status: "MANAGER_CONTRACT",
  });
  const permissionUser: STATUS = useMemo(() => {
    if (
      user?.role == ADMIN ||
      user?.permissions.includes(permissionObject.MANAGER)
    )
      return ADMIN;
    else if (user?.permissions.includes(permissionObject.OFFICE_ADMIN))
      return "OFFICE_ADMIN";
    else if (user?.permissions.includes(permissionObject.SALE)) return "SALE";
    else return "OFFICE_STAFF";
  }, [user]);

  const data = {
    object: {
      content: [
        {
          id: 1,
          name: "Hợp đồng bán thận cho gái xinh",
          status: "SUCCESS",
          urgent: false,
        },
        { id: 2, name: "Contract B", status: "PENDING", urgent: true },
        { id: 3, name: "Contract C", status: "FAILED", urgent: true },
        { id: 4, name: "Contract D", status: "SUCCESS", urgent: false },
        { id: 5, name: "Contract E", status: "PENDING", urgent: false },
        // Add more items as needed
      ],
    },
  };
  const saleContract = [
    {
      id: 1,
      title: "🗂️ Quản lí hợp đồng",
      status: "MANAGER_CONTRACT",
    },
    {
      id: 2,
      title: "🕒 Đợi duyệt",
      status: "WAIT_APPROVE",
    },
    {
      id: 3,
      title: "🎯 Đã được duyệt",
      status: "APPROVED",
    },
    {
      id: 4,
      title: "✍️ Chờ sếp ký",
      status: "WAIT_SIGN_A",
    },
    {
      id: 5,
      title: "👌 Sếp ký thành công",
      status: "SIGN_A_OK",
    },
    {
      id: 6,
      title: "⏳ Chờ khách hàng ký",
      status: "WAIT_SIGN_B",
    },
    {
      id: 7,
      title: "✅ Đã Hoàn thành",
      status: "SUCCESS",
    },
  ];
  const adminOfficeContract = [
    {
      id: 1,
      title: "🗂️ Quản lí hợp đồng",
      status: "MANAGER_CONTRACT",
    },
    {
      id: 2,
      title: "🔎 Cần duyệt",
      status: "WAIT_APPROVE",
    },
    {
      id: 3,
      title: "🎯 Đã duyệt",
      status: "APPROVED",
    },
    {
      id: 4,
      title: "✍️ Chờ sếp ký",
      status: "WAIT_SIGN_A",
    },
    {
      id: 5,
      title: "👌 Đã ký",
      status: "SIGN_A_OK",
    },
    {
      id: 6,
      title: "✅ Đã Hoàn thành",
      status: "SUCCESS",
    },
  ];
  const adminContract = [
    {
      id: 1,
      title: "🗂️ Quản lí hợp đồng",
      status: "MANAGER_CONTRACT",
    },
    {
      id: 2,
      title: "✍️ Chờ ký",
      status: "WAIT_SIGN_A",
    },
    {
      id: 3,
      title: "👌 Đã ký",
      status: "SIGN_A_OK",
    },
    {
      id: 4,
      title: "✅ Đã Hoàn thành",
      status: "SUCCESS",
    },
  ];

  const menuContract = {
    ADMIN: adminContract,
    SALE: saleContract,
    OFFICE_ADMIN: adminOfficeContract,
    OFFICE_STAFF: [],
  };

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 0.2 }]}>{(index + 1).toString()}</Text>
      <Text style={[styles.cell, { flex: 0.4, padding: 2 }]}>
        {item?.status != "SUCCESS" && item?.urgent && (
          <Entypo name="warning" size={20} color="red" />
        )}
        {item.name}
      </Text>
      <Text
        style={[
          styles.cell,
          {
            color: item.status === "SUCCESS" ? "green" : "red",
            flex: 0.3,
            textAlign: "left",
          },
        ]}
      >
        {item.status === "SUCCESS" ? "Thành công" : "Thất bại"}
      </Text>
      <TouchableOpacity
        style={[
          styles.cell,
          {
            flex: 0.2,
            marginHorizontal: "auto",
          },
        ]}
      >
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color="black"
          style={{ textAlign: "center", alignItems: "center" }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 5,
        }}
      >
        <TouchableOpacity style={styles.contractStatus} onPress={openModal}>
          <Text style={{ padding: 5 }}>Trạng thái▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Text style={[styles.headerCell, { flex: 0.2 }]}>STT</Text>
        <Text style={[styles.headerCell, { flex: 0.4 }]}>Tên hợp đồng</Text>
        <Text style={[styles.headerCell, { flex: 0.3, textAlign: "left" }]}>
          Trạng thái
        </Text>
        <Text style={[styles.headerCell, { flex: 0.2 }]}>Hành động</Text>
      </View>
      <FlatList
        data={data.object.content}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {data && data.object.content.length != 0 && (
        <Pagination
        // Add pagination component logic here
        />
      )}
      {modal && (
        <Modal
          animationType="fade"
          transparent={true}
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              backgroundColor: "white",
              position: "absolute",
              width: "80%",
              height: "auto",
              borderRadius: 10,
              top: "50%",
              left: "50%",
              transform: [
                { translateX: -(width * 0.4) },
                { translateY: -(height * 0.25) },
              ],
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                ✘
              </Text>
            </TouchableOpacity>
            <View style={{ paddingHorizontal: 2 }}>
              {menuContract["OFFICE_ADMIN"].map((item: any) => (
                <Text
                  key={item.id}
                  style={{
                    fontSize: 20,
                    padding: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: "gainsboro",
                    fontWeight: "bold",
                    marginVertical: 5,
                  }}
                >
                  {item.title}
                </Text>
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  contractStatus: {
    borderRadius: 5,
    backgroundColor: "darkturquoise",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
  },
  container: {
    // flex: 1,
    maxHeight: "96%",
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    justifyContent: "space-between",
  },
  headerCell: {
    flex: 0.2,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
  textGap: {
    marginVertical: 2,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    textAlign: "center",
    alignItems: "center",
  },
  cell: {
    flex: 0.2,
    padding: 6,
    textAlign: "center",
    alignItems: "center",
  },
  linkText: {
    color: "blue",
    textAlign: "center",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    color: "blue",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    display: "flex",
    position: "absolute",
    alignItems: "baseline",
    justifyContent: "center",
    margin: "auto",
    width: "80%",
    // height: "45%",
    backgroundColor: "white",
    paddingLeft: 40,
    borderRadius: 10,
    bottom: "40%",
    left: "10%",
  },
  menuOptionText: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 10,
    fontSize: 21,
    fontWeight: "bold",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  seperator: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "82%",
  },
});
