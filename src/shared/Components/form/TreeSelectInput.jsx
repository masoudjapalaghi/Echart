import React from "react";

export const TreeSelectInput = () => {
  const dataFake = [
    { id: 1, name: "کالای دیجیتال", children: [{ id: 11, name: "تلویزیون", children: [] }] },
    { id: 2, name: "لوازم خانه", children: [] },
    {
      id: 3,
      name: "کالای زینتی",
      children: [
        {
          id: 31,
          name: "زیور آلات",
          children: [
            { id: 311, name: "دستبند", children: [] },
            {
              id: 312,
              name: "گردنبند",
              children: [{ id: 3111, name: "ورساچی", children: [{ id: 31111, name: "طلای سفید", children: [] }] }],
            },
          ],
        },
      ],
    },
    { id: 4, name: "لوازم آرایشی", children: [] },
  ];

  return <div>
    {dataFake.map((item,index)=>{
        return (
            <div key={item.id}>



            </div>
        )
    })}
  </div>;
};
