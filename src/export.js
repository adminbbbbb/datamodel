import DataModel from './datamodel';
import {
  compose,
  bin,
  select,
  project,
  groupby as groupBy,
  calculateVariable,
  sort,
  crossProduct as join,
  difference,
  naturalJoin,
  leftOuterJoin,
  rightOuterJoin,
  fullOuterJoin,
  union
} from './operator';
import * as Stats from './stats';
import * as enums from './enums';
import { DateTimeFormatter } from './utils';
import { DataFormat, FilteringMode } from './constants';
import pkg from '../package.json';

DataModel.Operators = {
    compose,
    bin,
    select,
    project,
    groupBy,
    calculateVariable,
    sort,
    join,
    difference,
    naturalJoin,
    leftOuterJoin,
    rightOuterJoin,
    fullOuterJoin,
    union
};
DataModel.Stats = Stats;
Object.assign(DataModel, enums);
DataModel.DateTimeFormatter = DateTimeFormatter;
DataModel.DataFormat = DataFormat;
DataModel.FilteringMode = FilteringMode;
DataModel.version = pkg.version;

export default DataModel;
