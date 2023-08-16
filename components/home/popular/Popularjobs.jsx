import React, { useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  ActivityIndicator 
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from '../../../hook/useFetch'


const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState();
  const {data, isLoading, error } = useFetch(
    'search', {
      query: 'React Developer',
      num_pages: 1
    }
  )
  console.log(data);
  const handleCardPress = ({ item }) => {};

  return (
    <View style={styles.container}>
      {/*This is where default mode being flex
      really comes in handy, no additional styling
      to organize the button to the right*/}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Popular jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
  
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard 
                handleCardPress={handleCardPress}
                item={item}
              />
            )}
            keyExtractor={item => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium}}
            horizontal
          />
        )}
      </View>
      
    </View>
  )
}

export default Popularjobs