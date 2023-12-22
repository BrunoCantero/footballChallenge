import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, ImageSourcePropType } from 'react-native';
import { styles } from './TeamInfoList.styles';
import defaultPlayerImage from '../../../assets/default.png';

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

interface DisplayTeamProps {
  team: number | null;
  teams: Team[];
  refreshing: boolean | null | undefined;
  onRefresh: () => void;
}

export const TeamInfoList = ({ team, teams, refreshing, onRefresh }: DisplayTeamProps) => {
  const [playerImages, setPlayerImages] = useState<Record<string, ImageSourcePropType>>({});

  useEffect(() => {
    const newPlayerImages = teams.find(t => t.team_key === team)?.players.reduce((acc, player) => {
      acc[player.player_key] = player.player_image && player.player_image.trim() !== '' 
        ? { uri: player.player_image } 
        : defaultPlayerImage;
      return acc;
    }, {} as Record<string, ImageSourcePropType>);
    setPlayerImages(newPlayerImages || {});
  }, [team, teams]);

  const onImageError = (playerKey: string) => {
    setPlayerImages(prevImages => ({ ...prevImages, [playerKey]: defaultPlayerImage }));
  };

  const renderPlayer = ({ item }: { item: Player }) => {
    return (
      <View style={styles.playerContainer}>
        <Image
          source={playerImages[item.player_key]}
          defaultSource={defaultPlayerImage}
          onError={() => onImageError(item.player_key)}
          style={styles.playerIcon}
        />
        <View>
          <Text style={styles.playerText}>Name: {item.player_name}</Text>
          <Text style={styles.playerText}>Position: {item.player_type}</Text>
          <Text style={styles.playerText}>Number: {item.player_number.toString()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {teams.find(t => t.team_key === team) && (
        <FlatList
          style={styles.playerList}
          data={teams.find(t => t.team_key === team)?.players}
          renderItem={renderPlayer}
          keyExtractor={item => item.player_key}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

