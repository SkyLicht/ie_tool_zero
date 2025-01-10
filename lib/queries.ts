const api = "http://10.13.33.98:3004";

export const GET_ALL_WORKDAYS_BY_DATE = (str_date: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_by_str_date?str_date=${str_date}`;
};

export const CREATE_WORK_PLAN = `${process.env.FASTAPI_URL}/api/v1/planner/create_work_plan`;

export const CREATE_LAYOUT = (line_id: string) =>
  `${process.env.FASTAPI_URL}/api/v1/layout/create_layout?line_id=${line_id}`;

export const GET_ALL_OPERATIONS_AREAS = `${process.env.FASTAPI_URL}/api/v1/layout/get_operations_areas`;

export const GET_LAYOUT_BY_ID = (id: string) => {
  return `${process.env.FASTAPI_URL}/api/v1/layout/get_layout_by_id?layout_id=${id}`;
};

export const GET_ALL_WORK_PLANS_BY_WORK_DAY_ID = (
  work_plan: string,
  str_date: string,
) => {
  return `${process.env.FASTAPI_URL}/api/v1/planner/get_work_plan_by?str_date=${str_date}&work_day_id=${work_plan}`;
};
export const GET_ALL_LINES = `${process.env.FASTAPI_URL}/api/v1/layout/get_lines`;

export const LineBalanceRequestQuery = () => {
  return {
    SERVER: {
      GET_LINE_BALANCES_BY_WEEK: (str_date: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_all_by_week?str_date=${str_date}`;
      },
      GET_LINE_BALANCES_BY_WEEK_2: (week: number) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_line_balances_by_week?week=${week}`;
      },
      GET_LINE_BALANCE_BY_ID: (id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_by_id?line_balance_id=${id}`;
      },
      GET_TAKES_BY_LINE_BALANCE_ID: (line_balance_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_takes_by_line_balance?line_balance=${line_balance_id}`;
      },
      GET_CYCLE_TIMES_BY_TASK_ID: (task_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_cycle_times_by_take_id?take_id=${task_id}`;
      },
      CREATE_LINE_BALANCE: (str_date: string, line_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/create?str_date=${str_date}&line_id=${line_id}`;
      },
      CREATE_TASK_WITH_STATIONS: `${process.env.FASTAPI_URL}/api/v1/line_balance/create_task`,
      DELETE_TAKE: (task_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/delete_take?take_id=${task_id}`;
      },
      UPDATE_RECORD: `${process.env.FASTAPI_URL}/api/v1/line_balance/update_record_by_id`,
    },
  };
};
export const StationsRequestQuery = () => {
  return {
    SERVER: {
      GET_STATIONS_BY_LAYOUT_ID: (layout_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/layout/get_stations_by_layout_id?layout_id=${layout_id}`;
      },
      GET_STATIONS_BY_LINE_BALANCE_ID: (line_balance_id: string) => {
        return `${process.env.FASTAPI_URL}/api/v1/line_balance/get_stations_by_line_balance?line_balance_id=${line_balance_id}`;
      },
    },
  };
};
export const GET_ALL_LAYOUTS = `${process.env.FASTAPI_URL}/api/v1/layout/get_layouts`;
// client

export const UPDATE_LAYOUT = `${api}/api/v1/layout/update_layout`;
export const GET_ALL_PLATFORMS_IN_SERVICE = `${api}/api/v1/platform/get_all_in_service`;
