import * as competition from './competition'
import * as business from './business'
import * as project from './project'
import * as picture from './picture'
import * as comment from './comment'
import * as login from './login'
import * as team from './team'

export default {
  ...competition,
  ...project,
  ...business,
  ...picture,
  ...comment,
  ...login,
  ...team
};
