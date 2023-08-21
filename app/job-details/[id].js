import React from 'react';
import { Text, 
        View, 
        SafeAreaView, 
        ScrollView, 
        ActivityIndicator, 
        RefreshControl 
    } from "react-native";
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} 
from '../../components';
import { COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';

const points = ["Most huggable teddy bears", "I would prefer 3 green beans not 2", "764 years of experience ENTRY LEVEL POSITION" , "MUST HAVE 4 GREEN BEANS I CHANGED MY MIND", "No paternal leave I hate men"]
const description = "Six things I like most about corn: number 1, corn is super sweet and tasty. Number5 I really like the color yellow and corn yellow is a great color. Number 2, I like when you can make cream corn (creme has the british (deragotory) call it). NUmber 7 idk how to spell derogatiory"

function JobDetails() {
    const tabs = ["About", "Qualifications", "Responsibilities"];
    const [activeTab, setActiveTab] = useState(0);

    const params = useGlobalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, refetch } = useFetch('job-details', {
        job_id: params.id
    });

    const [refreshing, onRefreshing] = useState(false);
    function onRefresh() {}
    function displayTabContent() {
        switch(activeTab) {
            case "Qualifications":
                return (
                    // API has stopped fetching for details so filler data
                    <Specifics 
                        title={"Qualifications"}
                        points={points}
                    />
                );
            case "About":
                return (
                    <JobAbout 
                        info={description}
                    />
                );
            case "Responsibilities":
                return (
                    // API has stopped fetching for details so filler data
                    <Specifics 
                        title={"Responsibilities"}
                        points={points}
                    />
                );
        }
    }
    return (  
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ""
                }}
            />
            <>
                <ScrollView showsVerticalScrollIndicator="false" 
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} />
                    }
                >
                    {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : (error) ? (<Text>Something went wrong!</Text>) :
                    data.length === 0 || data === undefined ? (<Text>No data found</Text>) : (
                        <View style={{ 
                            padding: SIZES.medium,
                            paddingBottom: 100,
                        }}>
                            <Company 
                                companyLogo={data[0].employer_logo}
                                jobTitle={data[0].job_title}
                                companyName={data[0].employer_name}
                                location={data[0].job_country}
                            />
                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
                        </View>
                    )}
                </ScrollView>
                <JobFooter url={"https://trello.com/b/58sW6ayu/personal-progress"}/>
            </>
        </SafeAreaView>
    );
}

export default JobDetails;