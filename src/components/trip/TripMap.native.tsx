import type { Place } from "@/lib/itinerary";
import { SymbolView } from "expo-symbols";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const BLUE = "#2E6FF2";
const GREEN = "#2FA36B";

type NumberedPlace = Place & { n: number };

export function TripMap({ places }: { places: NumberedPlace[] }) {
  const mapRef = useRef<MapView>(null);
  const region = regionForPlaces(places);

  if (places.length === 0 || !region) return null;

  return (
    <>
      <Text className="mt-7 px-5 text-[24px] font-extrabold tracking-tight text-[#0F1B2D]">
        Map
      </Text>
      <View
        className="mx-5 mt-3 overflow-hidden rounded-[20px]"
        style={{
          height: 230,
          shadowColor: "#0F1B2D",
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={region}>
          {places.map((place) => (
            <Marker
              key={place.n}
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              title={place.name}
              description={place.description}
            >
              <Pin
                n={place.n}
                color={place.kind === "restaurant" ? GREEN : BLUE}
              />
            </Marker>
          ))}
        </MapView>

        <Pressable
          onPress={() => mapRef.current?.animateToRegion(region, 400)}
          hitSlop={8}
          className="absolute right-3 top-3 h-11 w-11 items-center justify-center rounded-full bg-white"
          style={{
            shadowColor: "#0F1B2D",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
          }}
        >
          <SymbolView name="location.fill" size={18} tintColor={BLUE} />
        </Pressable>
      </View>
    </>
  );
}

function Pin({ n, color }: { n: number; color: string }) {
  return (
    <View className="items-center">
      <View
        className="h-8 w-8 items-center justify-center rounded-full border-2 border-white"
        style={{ backgroundColor: color }}
      >
        <Text className="text-[13px] font-bold text-white">{n}</Text>
      </View>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: 5,
          borderRightWidth: 5,
          borderTopWidth: 7,
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
          borderTopColor: color,
          marginTop: -1,
        }}
      />
    </View>
  );
}

function regionForPlaces(places: NumberedPlace[]) {
  if (places.length === 0) return null;
  const lats = places.map((p) => p.latitude);
  const lngs = places.map((p) => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: Math.max((maxLat - minLat) * 1.5, 0.03),
    longitudeDelta: Math.max((maxLng - minLng) * 1.5, 0.03),
  };
}