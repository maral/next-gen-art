import { parse } from 'coolors-io'

if (process.argv.length > 2) {
  console.log(parse(process.argv[2]))
}
