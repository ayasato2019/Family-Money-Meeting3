import GenericListPage from '@/Objects/GenericPage';
import { InvestmentTypes } from '@/types/tableInvestmentsData';

export default function Investments({ listdata }: { listdata: InvestmentTypes[] }) {
  return (
    <GenericListPage
      listdata={listdata}
      pagetitle="とうし"
      targetType={2}
      postUrl="/investments_registration"
      deleteUrlPrefix="/investments_del"
      achieveUrlPrefix="/investments/achieve"
      categoryId={2}
    />
  );
}
