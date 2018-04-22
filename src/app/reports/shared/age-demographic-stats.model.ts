export class AgeDemographicStats {
  age: number;
  F: number;
  M: number;
}

class KeyValuePair {
  name: number;
  value: number;
}
export class AgeDemographicStatsD3 {
  name: string;
  series: KeyValuePair[];
}
