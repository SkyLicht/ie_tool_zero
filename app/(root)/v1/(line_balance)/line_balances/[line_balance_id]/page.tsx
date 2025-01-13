"use server";
import React from "react";
import { auth } from "@/auth";
import { catchErrorTyped, customPackagedError } from "@/lib/licht-request";
import { getLineBalanceById } from "@/features/request/request-line_balance";
import ChartLineBalanceContainer from "@/features/v1/line_balance/components/line_balance_statics/chart-line-balance-container";
import LineBalanceStaticsInfo from "@/features/v1/line_balance/components/line_balance_statics/line-balance-statics-info";
import LineBalanceStaticsBottlenecks from "@/features/v1/line_balance/components/line_balance_statics/line-balance-statics-bottlenecks";
import { getServerSideProps } from "@/lib/service-side";

const LineBalancePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ line_balance_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { line_balance_id } = await params;
  const session = await getServerSideProps();

  const [error, line_balance] = await catchErrorTyped(
    getLineBalanceById(session.user.token, line_balance_id),
    [...customPackagedError, Error],
  );

  if (error) {
    return <p>eror </p>;
  }

  if (!line_balance) {
    return <p>no data </p>;
  }
  return (
    <main className="content_full ">
      <section className="w-full h-1/2 flex flex-row pb-4 ">
        <section className="w-1/2 h-full">
          <LineBalanceStaticsInfo data={line_balance} />
        </section>
        <section className="w-1/2 h-full flex justify-end">
          <LineBalanceStaticsBottlenecks
            records={line_balance.refactored_records.filter(
              (r) => r.has_updated,
            )}
          />
        </section>
      </section>
      <section className="w-full h-1/2">
        <ChartLineBalanceContainer data={line_balance} />
      </section>
    </main>
  );
};

export default LineBalancePage;
