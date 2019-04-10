select * from customer.address;

INSERT INTO `customer`.`address` (
    customer_id,
    full_name,
    address_type_id,
    addr_1,
    addr_2,
    city,
    county,
    country,
    postcode
) VALUES (
    UUID_TO_BIN('e4a7e802-0d43-41a2-b92b-b9704a264db5'),
    'xyz',
    1,
    '346/2',
    'xyzzzzz',
    'London',
    'Surrey',
    'United Kingdom',
    'SN3 4XS'
)