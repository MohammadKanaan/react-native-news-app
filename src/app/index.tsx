import ArticleHeadline from "@/components/ArticleHeadline";
import { Article } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

export default function Page() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // it's not an important api key so it's fine to expose it
  useEffect(() => {
    if (search) {
      fetch(
        `https://gnews.io/api/v4/search?q=${search}&apikey=0c1d8454dd5bf41d723b7d67a3ab51d7`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let articles = data.articles;
          let articleData: Article[] = [];

          for (let i = 0; i < articles.length; i++) {
            articleData.push({
              title: articles[i]["title"],
              description: articles[i]["description"],
            });
          }
          setArticles(articleData);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      fetch(
        `https://gnews.io/api/v4/top-headlines?category=general&lang=en&apikey=0c1d8454dd5bf41d723b7d67a3ab51d7`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let articles = data.articles;
          let articleData: Article[] = [];

          for (let i = 0; i < articles.length; i++) {
            articleData.push({
              title: articles[i]["title"],
              description: articles[i]["description"],
            });
          }
          setArticles(articleData);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [search]);

  return (
    <View className="flex flex-col gap-2 flex-1 p-4">
      <TextInput
        placeholder="Search"
        className="p-2 border-2 rounded-lg"
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleHeadline
            key={item.title}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </View>
  );
}
