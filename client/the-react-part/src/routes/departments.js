import React from 'react';
import { AddDepartment } from '../components/dashboard/add-department';
import { ViewDepartments } from '../components/dashboard/view-departments';

export const Departments = () => {
  return (
    <div>
      <h2 id='page-title'>Departments</h2>
      <ViewDepartments />
      <AddDepartment />
    </div>
  );
};
