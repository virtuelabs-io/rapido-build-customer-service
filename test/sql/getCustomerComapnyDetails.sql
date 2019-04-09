-- check table contents
SELECT * FROM `customer`.`company` LIMIT 1000;
-- insert data for testing

INSERT INTO `customer`.`company` (
    customer_id,
    company_name,
    vat_number,
    addr_1,
    addr_2,
    city,
    county,
    country,
    postcode
) VALUES (
    UUID_TO_BIN('08bb88a0-5ac3-11e9-8647-d663bd873d93'),
    'Mysql PVT LTD',
    '2354676843',
    '346/2',
    'Street 1',
    'London',
    'Surrey',
    'United Kingdom',
    'SN3 4XS'
)
-- Run query to validate the join used in getCustomerComapnyDetails
SELECT  *
FROM customer.company 
WHERE a.customer_id = UUID_TO_BIN('08bb88a0-5ac3-11e9-8647-d663bd873d93');
