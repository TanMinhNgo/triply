import type { Place } from "@/lib/itinerary";
import { Text, View } from "react-native";

type NumberedPlace = Place & { n: number };

export function TripMap({ places }: { places: NumberedPlace[] }) {
  if (places.length === 0) return null;

  return (
    <>
      <Text className="mt-7 px-5 text-[24px] font-extrabold tracking-tight text-[#0F1B2D]">
        Map
      </Text>
      <View
        className="mx-5 mt-3 rounded-[20px] border bg-[#F7F9FC] p-4"
        style={{ borderColor: "#E7EAF0" }}
      >
        <Text className="text-[15px] font-semibold text-[#0F1B2D]">
          Places in this trip
        </Text>
        <View className="mt-3 gap-2">
          {places.map((place) => (
            <View key={place.n} className="flex-row gap-3">
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#2E6FF2]">
                <Text className="text-[12px] font-bold text-white">
                  {place.n}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-[14px] font-semibold text-[#0F1B2D]">
                  {place.name}
                </Text>
                <Text className="text-[13px] text-[#8A94A6]">
                  {place.timeOfDay}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
}