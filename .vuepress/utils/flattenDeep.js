export default function flattenDeep(obj, result = []) {
  if(!Array.isArray(obj)){
    return [];
  }
  (obj || []).map((item,i)=>{
    const {
      children,
      ...keys,
    }=item;
    result.push(keys);
    flattenDeep(children || [],result)
  })

  return result
}