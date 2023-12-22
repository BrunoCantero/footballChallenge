import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList } from 'react-native';
import { SkeletonLoading } from './src/components/common/SkeletonList/SkeletonList';
import { TeamInfoList } from './src/components/TeamInfoList/TeamInfoList';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import moment from 'moment';

interface Player {
  player_key: string;
  player_name: string;
  player_type: string;
  player_number: number;
  player_image?: string;
}
interface Team {
  team_name: string;
  team_key: string;
  players: Player[];
}

interface Match {
  match_date: string;
  match_hometeam_name: string;
  match_awayteam_name: string;
  match_hometeam_score: string;
  match_awayteam_score: string;
  match_id: string;
}


function App() {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamValues, setTeamValues] = useState<{ label: string, value: string }[]>([]);
  const [matches, setMatches] = useState<Match[]>([]); 
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMatches, setLoadingMatches] = useState(false);
  
  const normalizeDataTeams = (data: Team[]) => {
   const teams = data.map((item)=> ({
        label: item.team_name,
        value: item.team_key
    }))
   return teams
  }

 const getTeamsData = async () => {
  try {
    const response = await axios.get('https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=4a3287764a5f95a2249dc8a63a3cc592ce35e7c404b45623791fcd91800b9d8c')
    setTeams(response.data)
    setTeamValues(normalizeDataTeams(response.data))
 } catch (err){
  console.error(err)
  }
 }

 const getMatchesPlayed = async (teamId: number | null ) => {
  setLoadingMatches(true)
  const startOfLastMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfLastMonth = moment().endOf('month').format('YYYY-MM-DD');
  try {
    const response = await axios.get(`https://apiv3.apifootball.com/?action=get_events&from=${startOfLastMonth}&to=${endOfLastMonth}&team_id=${teamId}&league_id=302&APIkey=4a3287764a5f95a2249dc8a63a3cc592ce35e7c404b45623791fcd91800b9d8c`)
    setMatches(response.data);
  } catch (err) {
    console.error('error retrieving matches', err)
  }
  setLoadingMatches(false)
 }

 const renderItem = ({ item }: any) => (
  <View style={styles.matchContainer}>
    <Text style={styles.matchText}>Date: {item.match_date}</Text>
    <Text style={styles.matchText}>{item.match_hometeam_name} vs {item.match_awayteam_name}</Text>
    <Text style={styles.matchText}>Score: {item.match_hometeam_score} - {item.match_awayteam_score}</Text>
    {!item.match_hometeam_score && !item.match_awayteam_score  && <Text style={styles.matchText}>To be Played</Text>}
  </View>
);

const onRefreshTeams = async () => {
  setRefreshing(true);
  await getTeamsData();
  setRefreshing(false);
};
  useEffect(() => {
    getTeamsData()
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
        <DropDownPicker
          testID="dropdown-picker"
          open={open}
          value={selectedTeam}
          items={teamValues}
          setOpen={setOpen}
          setValue={setSelectedTeam}
          multiple={false}
          onChangeValue={(val : number | null)=> getMatchesPlayed(val)}
        />
      <View>
        {selectedTeam && <Text style={styles.infoText}>Matches of the Month</Text>}
        {selectedTeam ? (
          loadingMatches ? (
            <SkeletonLoading />
          ) : (
            <FlatList
              horizontal
              data={matches}
              renderItem={renderItem}
              keyExtractor={(item) => item.match_id}
              style={styles.matchesList}
            />
          )
        ) : <Text style={styles.infoText}>You should select a Team</Text>}
      </View>
      {selectedTeam && <Text style={styles.infoText}> Players  </Text>}
      <TeamInfoList team={selectedTeam} teams={teams} onRefresh={onRefreshTeams} refreshing={refreshing} />
    </SafeAreaView>
  );
}
//TODO: abastract styles to a separate file, to let app as clean as possible, 
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#0D1117',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  infoText: {
    color: 'white', alignSelf: 'center', paddingTop: 20
  },
  matchContainer: {
    backgroundColor: '#3F51B5',
    padding: 16,
    marginHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  matchText: {
    color: '#C9D1D9', 
    fontSize: 16,
    fontWeight: 'bold',
  },
    matchesList: {
      marginTop: 20,
      maxHeight: 110,
    },
});

export default App;
