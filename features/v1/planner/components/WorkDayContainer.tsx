import { WorkDay } from "@/types/planner";
import WorkPlansContainer from "@/features/v1/planner/components/WorkPlansContainer";
import WorkDayAddWorkPlan from "@/features/v1/planner/components/forms/WorkDayAddWorkPlan";

const WorkDayContainer = ({ record }: { record: WorkDay }) => {
  return (
    <li
      className={
        "w-[270px] flex flex-col rounded-xl bg-licht_surface shadow-2xl p-2"
      }
    >
      <div className="w-full flex flex-row items-center justify-center gap-2 font-semibold">
        <h2>{record.line.name}</h2>
        <h2>{record.line.factory.name}</h2>
      </div>

      <div className="flex flex-col gap-2">
        <WorkDayAddWorkPlan
          work_day_id={record.id}
          str_date={record.str_date}
          line_id={record.line.id}
        />
        <div className="flex justify-center">
          <WorkPlansContainer
            work_day_id={record.id}
            str_date={record.str_date}
          />
        </div>
      </div>
    </li>
  );
};

export default WorkDayContainer;
