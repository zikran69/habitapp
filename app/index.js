//this represent "/" (main roots)
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

export default function index() {
  return <Redirect href="/home" />;
}

const styles = StyleSheet.create({});
