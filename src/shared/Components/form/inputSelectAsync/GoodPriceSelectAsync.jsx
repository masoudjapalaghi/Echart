import { PriceingProxy } from '@services/api/pricing';
import { useFetching } from '@services/axiosHelper';
import React from 'react'
import { InputSelect } from '..';

export  const GoodPriceSelectAsync = ({ title = "گروه مشتری", ...rest }) => {
 const { GoodPriceSelectAsync, isLoading, refetch } = useFetching(["GoodPriceSelectAsync"], () => PriceingProxy.getGoodList(), {
        enabled: false,
      });
      let options = GoodPriceSelectAsync.status === 1 ? GoodPriceSelectAsync.entity.map((u) => ({ value: u.id, label: u.title })) : [];
  return (
    <>
    <InputSelect
      options={options}
      isLoading={GoodPriceSelectAsync && isLoading}
      title={title}
      onFocus={!GoodPriceSelectAsync.entity?.length > 0 && refetch}
      {...rest}
    />
  </>
  )
} 
