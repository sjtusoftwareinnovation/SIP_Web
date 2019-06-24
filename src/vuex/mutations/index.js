import * as competition from './competition'
import * as business from './business'
import * as project from './project'
import * as userData from './userData'
import * as team from './team';
import * as picture from './picture';
import * as comment from './comment';

export default {
  ...competition,
  ...business,
  ...project,
  ...userData,
  ...team,
  ...picture,
  ...comment
}
