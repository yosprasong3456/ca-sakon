SELECT
 `zdata_person`.`hn` AS `hn`,
CASE
  `zdata_person`.`pname` 
  WHEN 'นาย' THEN
  1 
  WHEN 'นาง' THEN
  2 
  WHEN 'น.ส.' THEN
  3 
  WHEN 'ด.ช.' THEN
  4 
  WHEN 'ด.ญ.' THEN
  5 
  WHEN 'พ.ภ' THEN
  5 ELSE 99 
 END AS `title_code`,
 CONVERT ( `zdata_person`.`fname` USING utf8 ) AS `name`,
 CONVERT ( `zdata_person`.`lname` USING utf8 ) AS `last_name`,
 REPLACE ( `zdata_person`.`birthday`, '-', '' ) AS `birth_date`,
 concat(
  substr( `zdata_person`.`cid`, 1, 1 ),
  '-',
  substr( `zdata_person`.`cid`, 2, 4 ),
  '-',
  substr( `zdata_person`.`cid`, 6, 5 ),
  '-',
  substr( `zdata_person`.`cid`, 11, 2 ),
  '-',
 substr( `zdata_person`.`cid`, 13, 1 )) AS `cid`,
 `zdata_person`.`sex` AS `sex_code`,
 `zdata_person`.`citizenship` AS `citizenship`,
CASE
  ( SELECT `emp_citizenship`.`emp_citizenship_name` FROM emp_citizenship WHERE `zdata_person`.`citizenship` = `emp_citizenship`.`emp_citizenship_id` LIMIT 1 ) 
  WHEN 'ไทย' THEN
  '1' 
  WHEN 'จีน' THEN
  '2' 
  WHEN 'ลาว' THEN
  '3' 
  WHEN 'กัมพูชา' THEN
  '4' 
  WHEN 'พม่า' THEN
  '5' 
  WHEN 'อื่น ๆ' THEN
  '8' 
  WHEN 'ไม่ระบุ' THEN
  '9' ELSE '' 
 END AS `nationality_code`,
 ifnull( CONVERT ( `zdata_person`.`addrpart` USING utf8 ), '' ) AS `address_no`,
 REPLACE ( `zdata_person`.`moopart`, ' ', '' ) AS `address_moo`,
 concat( `zdata_person`.`chwpart`, `zdata_person`.`amppart`, `zdata_person`.`tmbpart` ) AS `area_code`,
 `zdata_person`.`addrpart` AS `permanent_address_no`,
 REPLACE ( `zdata_person`.`moopart`, ' ', '' ) AS `permanent_address_moo`,
 concat( `zdata_person`.`chwpart`, `zdata_person`.`amppart`, `zdata_person`.`tmbpart` ) AS `permanent_area_code`,
 `zdata_person`.`passport_no` AS `passport`,
 ifnull( `zdata_person`.`email`, '' ) AS `email`,
 REPLACE ( `zdata_person`.`informtel`, '-', '' ) AS `telephone_1`,
 '' AS `death_date`,
 '' AS death_cause_code,
 zdata_diagnosis_drg.icd10 as `diagnosis_drg`,
  '3' AS `behaviour_code`,
date_format( zdata_visit.vstdate, '%Y%m%d' ) as `visit_date`,
CASE
     WHEN zdata_person_inscl. hipdata_code in ('A1') THEN 1 
     WHEN zdata_person_inscl. hipdata_code in ('OFC') THEN 2 
     WHEN zdata_person_inscl. hipdata_code in ('SSS') THEN 3 
     WHEN zdata_person_inscl. hipdata_code in ('UCS','WEL') THEN 4 
   ELSE 9 
    END 
as `finance_support_code`,
'10705' AS hos_code
FROM patient zdata_person
JOIN ovst zdata_visit ON ( `zdata_person`.`hn` = `zdata_visit`.`hn` )
JOIN ovstdiag zdata_diagnosis_drg on (zdata_diagnosis_drg.vn = zdata_visit.vn and zdata_diagnosis_drg.diagtype = 1)
JOIN pttype zdata_person_inscl on (zdata_person_inscl.pttype = zdata_visit.pttype)
WHERE cast( `zdata_visit`.`vstdate` AS date ) = (CURRENT_DATE - INTERVAL 2 day)
AND `zdata_person`.`fname` NOT LIKE '%ทดสอบ%'  AND `zdata_person`.`lname` NOT LIKE '%ทดสอบ%' 
GROUP BY
 `zdata_person`.`cid` 
HAVING
   diagnosis_drg BETWEEN 'C00' 
   AND 'C97' 
   OR diagnosis_drg BETWEEN 'D37' 
   AND 'D48' 
ORDER BY
 `zdata_visit`.`vsttime`