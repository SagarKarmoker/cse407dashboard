type TLog = {
  code: "cur_power" | "cur_current" | "cur_voltage";
  event_from: string; // "1"
  event_id: 7;
  event_time: number; // 1701441141768
  status: string; // "1";
  value: string; // "84";
};

type TLogResult = {
  current_row_key: string;
  device_id: string;
  has_next: boolean;
  logs: TLog[];
  next_row_key?: string;
};

type TGetLogsResponse = {
  result: TLogResult;
  success: boolean;
  t: number; // time
  tid: string;
};

type TMeterData = {
  a: TLog;
  v: TLog;
  p: TLog;
  t: number;
};

type TDeviceInfoResult = {
  active_time: number;
  biz_type: number;
  category: string;
  create_time: number;
  icon: string;
  id: string;
  ip: string;
  lat: string;
  local_key: string;
  lon: string;
  model: string;
  name: string;
  online: boolean;
  owner_id: string;
  product_id: string;
  product_name: string;
  status: { code: string; value: string | boolean }[];
  sub: boolean;
  time_zone: string;
  uid: string;
  update_time: number;
  uuid: string;
};

type TGetDeviceInfoResponse = {
  result: TDeviceInfoResult;
  success: boolean;
  t: number;
  tid: string;
};

// esp

type TEspLog = {
  current: number;
  voltage: number;
  power: number;
  time: number;
};
