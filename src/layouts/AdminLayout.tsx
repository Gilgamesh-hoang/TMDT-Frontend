import React from 'react'

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <div >
        {/*<div>*/}
        {/*  <AdminSidebar/>*/}
        {/*</div>*/}
        {/*<div*/}
        {/*    className={`flex-1 transition-all duration-300 ease-in-out lg:ml-[290px]`}*/}
        {/*>*/}
        {/*  <AdminHeader/>*/}
          <div className="">
            {children}
          </div>
        {/*</div>*/}
      </div>
  )
}

