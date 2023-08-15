import React, { useState } from 'react'
import { 
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
 } from 'react-native'
import { useRouter } from "expo-router"

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants';

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');

  return (
    <View>
      <View>
        <Text style={styles.userName}>Hello, Gabriel!</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What are you looking for?"
            placeholderTextColor="#d3d3d3"
          >
          </TextInput>
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          >

          </Image>
        </TouchableOpacity>
      </View>

      {/*Use a FlatList when you need to show a sizable chunk of data*/}
      <View style={styles.tabsContainer}>
          <FlatList data={jobTypes}
            renderItem={({ item }) => (
              // Style it differently based on what item is the currently 
              // selected activeJob using useState
              <TouchableOpacity
                style={styles.tab(activeJobType, item)}
                onPress={() => {
                  setActiveJobType(item);
                  // ` ` means a template string {a dynamic string!}
                  router.push(`/search/${item}`) 
                }}
              >
                <Text style={styles.tabText(activeJobType, item)}>
                  { item }
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            contentContainerStyle={{columnGap: SIZES.small}}
            horizontal
          />
      </View>
    </View>
  )
}

export default Welcome