//filename : asqpl.js
function GetMortData(table_name) {
 table_name = table_name.trim();
 let outputData = [{
 tableName: '',
 data: []
 }];
 if(table_name!=undefined){
 table_name = table_name.toUpperCase();
 }

 let md = motality_data.filter(function (mort) {
 if (mort.tableName == table_name) {
 return mort;
 }
 });

 outputData[0].tableName = md[0].tableName;
 outputData[0].data = md[0].data;

 let tempArray = [];
 tempArray = outputData[0].data;

 let et = [];
 et = GetEntryType(table_name);
 let temp = [];
 GHighestAge = parseInt(et[0].highestAge);
 for (let f = 0; f <= GHighestAge; f++) {
 temp[f] = 0.0;
 }
 let m = 0;
 let mi = parseInt(et[0].lowestAge);
 let pli = 0;
 for (pli = mi; pli <= GHighestAge; pli++) {
 temp[pli] = tempArray[m];
 m++;
 }
 outputData[0].data = [];
 outputData[0].data = temp;


 return outputData;
}
function GetEntryType(mortName) {
 mortName = mortName.trim();
 if(mortName!=undefined){
 mortName = mortName.toUpperCase();
 } 

 let entryType = RawMort.filter(function (mort) {
 if (mort.tableName == mortName) {
 return mort;
 }
 });
 return entryType;
}
function projLivesGet(annt_age, PL) {

 var plOut = {
 annt_age: "",
 lowest_age: "",
 highest_age: "",
 l_base: ""
 };
 var plOutB = {
 annt_age: "",
 lowest_age: "",
 highest_age: "",
 l_base: ""
 };
 var plOutA = {
 annt_age: "",
 lowest_age: "",
 highest_age: "",
 l_base: ""
 };
 let tempEntryType = '';

 if(PL.InMortNameA!=undefined){
 tempEntryType = PL.InMortNameA.toUpperCase();
 }

 let TableEntry = GetEntryType(tempEntryType);
 switch (TableEntry[0].entryType) {
 case 'Q': // qx
 {
 let WorkAge;

 // Set our copy of age to 0 if not projecting; this gets us a
 // table good for all ages:
 WorkAge = annt_age;

 if (PL.InProjMultA == 0 && PL.InProjMultB == 0) WorkAge = 0;
 LowestAge = RidiculousAge;
 HighestAge = RidiculousAge;
 // Tell merge_table that we want to set the lowest and highest ages.
 // Add q-sub-x from the first table into Lives, then merge in the second table.
 // Lives then has the blended q-sub-x.
 // merge_table may adjust age upward if it's too low.



 let mortA = PL.InMortNameA;
 if (PL.InPropA != 0) {
 plOutA = MergeTable(mortA, PL.InMortMultA, PL.InPropA,
 PL.InProjNameA, PL.InProjMultA, PL.InProjBaseOffsetA,
 PL.InAgeOffsetA, LivesMaxAge + 1, LowestAge, HighestAge, WorkAge);

 LowestAge = plOutA.lowest_age;
 HighestAge = plOutA.highest_age;
 WorkAge = plOutA.annt_age;

 }
 if (PL.InPropA != 1000) {
 plOutB = MergeTable(PL.InMortNameB, PL.InMortMultB, 1000 - PL.InPropA,
 PL.InProjNameB, PL.InProjMultB, PL.InProjBaseOffsetB,
 PL.InAgeOffsetB, LivesMaxAge + 1, LowestAge, HighestAge, WorkAge);

 LowestAge = plOutB.lowest_age;
 HighestAge = plOutB.highest_age;
 WorkAge = plOutB.annt_age;

 }
 plOut.highest_age = HighestAge;
 plOut.lowest_age = LowestAge;
 plOut.annt_age = WorkAge;
 plOut.l_base = mergeData(plOutA.l_base, plOutB.l_base, plOut.highest_age);

 let WLives = plOut.l_base; // Scans Lives.
 let LastQx;
 let CurrLives = 1000;

 let WLivesOut = [];
 for (let i = 0; i <= plOut.highest_age; i++) {
 WLivesOut[i] = 0;
 }

 for (let k = WorkAge; k <= plOut.highest_age; k++) {

 if (k > WorkAge) {

 LastQx = WLives[k - 1];
 CurrLives = (1.0 - LastQx) * CurrLives;
 WLivesOut[k] = CurrLives;
 } else if (k == WorkAge) {
 WLivesOut[k] = CurrLives;
 // LastQx = WLives[k-1];
 // CurrLives = ( 1.0 - LastQx ) * CurrLives ;
 }

 }

 plOut.l_base = WLivesOut;
 }

 case 'L': // lx
 {
 //Need to implement
 // Take data from PAT table
 break;
 }

 }

 return plOut;
}
function mergeData(pA, pB, HighestAge) {
 let p = [];
 for (let m = 0; m <= HighestAge; m++) {
 let pAData = 0;
 let pBData = 0;
 if (isNaN(pA[m])) {
 pAData = 0;
 } else {
 pAData = pA[m];
 }
 if (isNaN(pB[m])) {
 pBData = 0;
 } else {
 pBData = pB[m];
 }
 p[m] = pAData + pBData;
 }
 return p;
}

function MergeTable(mt_mort_name, mort_mult, prop,

proj_name, proj_mult, proj_base_offset, age_offset, q_table_size, lowest_age,

highest_age, age) {



let mort_name = mt_mort_name;

var plOut = {

annt_age: "",

lowest_age: "",

highest_age: "",

l_base: ""

}



let w_lowest_age = 0; /* Work copy */

let work_highest_age = 0; // As passed in here.

let proj_highest_age = 0; // For new projection table.

let mort_highest_age = 0; // For new mortality table.

let a = 0; // Work age.

let wout_q = 0;

let q = 0;

let wq = 0;

let adj_q = 0;

let p = 0;

let wp = 0; // Initialization avoids a compiler warning.

let proj_factor = 0;



let offset = 0; // Initialization avoids a compiler warning.

let adjusting;

let projecting;



let QxT;







// q good as long as QxT lives....

let qxtGetOutput = QxTGet(mort_name, age_offset);



w_lowest_age = qxtGetOutput.lowest_age;

mort_highest_age = qxtGetOutput.highest_age;

q = qxtGetOutput.q;



lowest_age = adjust_limit_age(lowest_age, w_lowest_age, 'u');

highest_age = adjust_limit_age(highest_age, mort_highest_age, 'u');





adjusting = (mort_mult != 1000);

projecting = (proj_name != 'NONE' && proj_mult != 0);



if (projecting) {

let pxtGetOutput = QxTGet(proj_name, age_offset);

w_lowest_age = pxtGetOutput.lowest_age;

proj_highest_age = pxtGetOutput.highest_age;

p = pxtGetOutput.q;

lowest_age = adjust_limit_age(lowest_age, w_lowest_age, 'u');

offset = proj_base_offset;

wp = skipData(p, age);



}



age = Math.max(age, lowest_age);





let temp = [];

a = age;

wq = skipData(q, age);



for (let j = 0; j < wq.length-1; j++) {

let dq = wq[j];



if (adjusting)

//Need to implement

adj_q = bound_qx(dq * (mort_mult / 1e3));

else

adj_q = dq;



if (projecting) {

//Need to implement

let adj_p;



adj_p = (a < proj_highest_age) ? wp[j] : 1;

proj_factor = Math.pow(1. - (proj_mult / 1e3) * adj_p, offset);

adj_q = bound_qx(adj_q * proj_factor);

if (proj_base_offset == 0)

offset++;



}

wout_q = 0;

wout_q += adj_q * (prop / 1e3);

temp[j] = wout_q;

}

temp = fillData(temp, age);

temp = clearData(temp, highest_age);

plOut.l_base = temp;

plOut.annt_age = age;

plOut.lowest_age = lowest_age;

plOut.highest_age = highest_age;

return plOut;

}

function clearData(temp, highest_age) {

let actualArray = [];

actualArray = temp;

let cleanArray = [];

for (let c = 0; c <= highest_age; c++) {

let acArData = actualArray[c];

if (isNaN(acArData) || acArData == undefined) {

acArData = 0.0;

}

cleanArray[c] = acArData;

}

return cleanArray;

}

function fillData(p, number) {

let actualArray = [];

let filledDataArray = [];

let temp =[];

temp = p;

actualArray = temp.reverse();

for (let s = 0; s < number; s++) {

actualArray.push(0);

}

filledDataArray = actualArray.reverse();

return filledDataArray;

}

function skipData(p, number) {



let actualArray = [];

let skippedDataArray = [];

let temp =[];

temp = p;



actualArray = temp.reverse();

for (let s = 0; s < number; s++) {

actualArray.pop();

}



skippedDataArray = actualArray.reverse();

return skippedDataArray;

}

function adjust_limit_age(age, new_age, adjust_type) {

if (age == RidiculousAge ||

age < new_age && adjust_type == 'u' ||

age > new_age && adjust_type == 'd')

age = new_age;

return age;

}
function bound_qx(qx) {

if (qx < 0.0) return 0.0;

if (qx > 1.0) return 1.0;

return qx;

}

