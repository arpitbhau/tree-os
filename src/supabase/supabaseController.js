// radhe radhe

import supabase from "./supabaseConfig.js"

export async function getColumnValues(tableName, columnName) {
    const { data, error } = await supabase
      .from(tableName)
      .select(columnName)
  
    if (error) return false
  
    // Extract only the column values from the rows
    return data.map(row => row[columnName])
}

export async function updateCellValue(tableName, targetColumn, referenceColumn, referenceValue, newValue) {
    const { data, error } = await supabase
      .from(tableName)
      .update({ [targetColumn]: newValue })
      .eq(referenceColumn, referenceValue)
      .select() // Optional: return updated row(s)
  
    if (error) return error;
  
    return !!data

    // what's in data?
    // [
    //     {
    //       id: 2,
    //       name: 'B-Block',
    //       status: 'active' // This reflects the updated value
    //     }
    // ]
}
