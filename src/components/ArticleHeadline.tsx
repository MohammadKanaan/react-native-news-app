import { Article } from "@/types";
import React from "react";
import { Text, View } from "react-native";

export default function ArticleHeadline({ title, description }: Article) {
  return (
    <View className="flex flex-col gap-1 mb-2 bg-gray-200 rounded-lg p-2">
      <Text className="text-xl">{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}
