import capitalize from "@mui/utils/capitalize"

export function nameToAbbr(name?: string): string {
  if (!name) {
    return ''
  }

  const subNames = name.split(' ')
  return subNames.map((subName: string) => capitalize(subName.substr(0,1))).join('') 
}
