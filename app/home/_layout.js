import { Stack } from "expo-router";
import { ModalPortal } from "react-native-modals";

export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="create" options={{ headerShown: false }} />
      </Stack>

      {/* import this <ModalPortal/> inside your,it nessesary for layout to confirm that you use ModalContent on your component */}
      <ModalPortal />
    </>
  );
}
