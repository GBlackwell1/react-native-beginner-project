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

const Popularjobs = () => {
  const router = useRouter();
  // TODO: make not const
  const isLoading = false;

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
            data={[1,2,3,4,5,6,7,8,9]}
            renderItem={({ item }) => (
              <PopularJobCard 
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