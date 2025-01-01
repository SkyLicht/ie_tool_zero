"use server";

import WorkDayContainer from "@/features/v1/planner/components/WorkDayContainer";
import { WorkDayModel } from "@/features/types/work-day";

type Props = {
  data: WorkDayModel[];
};
const WorkDaysContainer = ({ data }: Props) => {
  return (
    <section className="content_full  flex flex-1 justify-center">
      <ul
        className={
          "w-fit h-fit grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2   gap-2 "
        }
      >
        {data.map((record, index) => (
          <WorkDayContainer key={index} record={record} />
        ))}
      </ul>
    </section>
  );
};

export default WorkDaysContainer;
