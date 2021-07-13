import {
  MdShortText,
  MdDateRange,
  MdArrowDropDownCircle,
} from "react-icons/md";
import { 
    BsTextLeft, 
    BsCheckBox, 
    BsFileArrowUp 
} from "react-icons/bs";
import {
  BiRadioCircleMarked,
  BiTimeFive,
} from "react-icons/bi";
import { TiTick } from "react-icons/ti";

/**
 * Array to hold all input types in the form
 * icon property holds to be displayed
 * text property is shown in the menu
 */

export const inputTypes = [
    {
        key:'IT1',
        value:0,
        icon:<MdShortText/>,
        text:'Small text'
    },
    {
        key:'IT2',
        value:1,
        icon:<BsTextLeft/>,
        text:'Long text'
    },
    {
        key:'IT3',
        value:2,
        icon:<BiRadioCircleMarked/>,
        text:'Single radio'
    },
    {
        key:'IT4',
        value:3,
        icon:<BiRadioCircleMarked/>,
        text:'Multiple radio'
    },
    {
        key:'IT5',
        value:4,
        icon:<BsCheckBox/>,
        text:'Single checkbox'
    },
    {
        key:'IT6',
        value:5,
        icon:<BsCheckBox/>,
        text:'Multi checkbox'
    },
    {
        key:'IT7',
        value:6,
        icon:<MdDateRange/>,
        text:'Date & time'
    },
    {
        key:'IT8',
        value:7,
        icon:<BsFileArrowUp/>,
        text:'File upload'
    },
    {
        key:'IT9',
        value:8,
        icon:<MdArrowDropDownCircle/>,
        text:'Dropdown'
    },
    {
        key:'IT10',
        value:9,
        icon:<MdDateRange/>,
        text:'Date'
    },
    {
        key:'IT11',
        value:10,
        icon:<BiTimeFive/>,
        text:'time'
    },
    {
        key:'IT12',
        value:11,
        icon:<TiTick/>,
        text:'Either-Or'
    },
];
