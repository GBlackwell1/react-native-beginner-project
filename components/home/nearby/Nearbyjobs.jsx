import React, { useState } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS, SIZES } from '../../../constants'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'


const Nearbyjobs = () => {
  const router = useRouter();
  const {data, isLoading, error } = useFetch(
    'search', {
      query: 'React Developer',
      num_pages: 1
    }
  )
  console.log(data);

  return (
    <View style={styles.container}>
      {/*This is where default mode being flex
      really comes in handy, no additional styling
      to organize the button to the right*/}
      <View style={styles.header}>

        <Text style={styles.headerTitle}>
          Nearby jobs
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
  
      </View>
      {/*FIXME: Loading spinner works, data is checked and the
      request is valid and populated but NearbyJobCard is not showing up*/}
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : error ? ( <Text>Something went wrong</Text>) : (
          data?.map((job) => (
            <NearbyJobCard 
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
      
    </View>
  )
}

export default Nearbyjobs