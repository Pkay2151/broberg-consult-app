-- Database schema for Broberg Consult Application

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name_of_project VARCHAR(255) NOT NULL,
    date VARCHAR(50),
    location VARCHAR(255),
    client_name VARCHAR(255), -- Store client name directly instead of foreign key
    project_features TEXT,
    position_held VARCHAR(255),
    activities TEXT,
    funding VARCHAR(255),
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('planning', 'in_progress', 'on_hold', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_client_name ON projects(client_name);

-- Broberg Consult Actual Projects (2010-2025)
-- Insert real company projects
INSERT INTO projects (name_of_project, date, location, client_name, project_features, position_held, activities, funding) VALUES 
('Construction of Block C and carpark at Labadi Beach Hotel', '2010/11', 'Labadi Beach Hotel, Accra Ghana', 'Legacy Holding (South Africa)', '3-storey building (60 bed rooms) and car park for 84 cars', 'Structural and Civil Engineer', 'Structural and Civil design', 'Client'),
('Construction of an Apartment building', '2012', 'Roman Ridge, Accra Ghana', 'Exodus Holding', '7-storey building with roof top pool and 1 underground car park', 'Structural and Civil Engineer', 'Structural design', 'Client'),
('Construction of a Boat Maintenance Facility and training facility', '2011/12', 'Tema, Ghana', 'US Government/Ghana Navy', 'Defense Boat hanger with maintenance facility and training school', 'Project Management including all Consultancy service', 'Design and build', 'US Government'),
('Construction of a new Milo Processing line', '2012/13', 'Tema, Ghana', 'Nestle Ghana Ltd', 'Industrial Development within existing Factory building - MILO', 'Project Management', 'Project Management for all civil works, Supervising all consultants, logistics for all contractors, Structural design of a 4 storey tower in steel with static and dynamic load, Structural design of a 6m deep pit (35m2) - powder dry inside', 'Client'),
('Workshop and office facility', '2012/2013', 'Takoradi', 'Aker Qserv GH Ltd.', 'Industrial Development (6000m2) with workshop (700m2) and office (300m2)', 'Project Management - Turn Key including all Consultancy services', 'Design and build', 'Client'),
('Construction of Conference facilities and Recreation area-Labadi Beach Hotel', '2012/2013', 'Accra, Ghana', 'Legacy Holding (South Africa)', 'Extension of hotel facilities, Single story buildings (1,800m2)', 'Structural and Civil Engineer', 'Design and supervision of work', 'SSNIT'),
('Construction of a Residential Houses (1800m2)', '2012/2016', 'Accra, Ghana', 'Private', 'Double storey building', 'Project Management, Structural- and Civil Engineer', 'Design and build', 'Client'),
('Design of New Palm Oil factory', '2012/2013', 'Apam', 'Serendipalm Ltd.', 'Palm oil factory', 'Project Management', 'Structural Design, Tender documents', 'Client'),
('Construction of Milk Powder Packing Facility', '2013/14', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Milk Powder Packing Facility', 'Project Management', 'Design, Tendering, Supervision of work', 'Client'),
('Design of a Recycling plant for plastic waste, E-waste and used Batteries', '2014/15', 'Teacher Mante, Ghana', 'Nehlsen and City Waste Management', 'Construction of 3 Nos. industrial buildings incl. offices and external works', 'Project Management', 'Architectural, Civil- and Structural Design only', 'Client'),
('Improvement of Social Facilitie`s at the Factory for Nestle Ghana Ltd.', '2014/15', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Refurbishment and Extension of existing building (Clinic, Canteen, Kitchen, Training rooms, Administration building and Locker rooms)', 'Project Management', 'Project Management, all Engineering Design, Tendering, Supervision of work', 'Client'),
('Construction of Life Line at the Factory for Nestle Ghana Ltd.', '2014/15', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Life line, access ladders and cat walk on all roofs (12,000m2)', 'Project Management, Design and supervision', 'Design, Tendering, Supervision of work', 'Client'),
('Construction of Reverse Osmosis Plant at Waste Treatment Plant at the Factory Nestle Ghana Ltd.', '2014/15', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Reverse Osmosis plant, Steel structure on concrete slab and concrete service ducts', 'Project Management, Design and supervision', 'Architectural- and Structural Design, Tendering, Supervision of work', 'Client'),
('Construction of Car Park at Labadi Beach Hotel', '2014', 'Accra, Ghana', 'Legacy Holding (South Africa)', 'Car park for 188 cars', 'Structural and Civil Engineer', 'Structural and Civil design', 'Client'),
('Construction of a Children''s Clinic', '2015/16', 'Efutu, Ghana', 'ANDO - Modular Aid', 'New Clinic Building', 'Project Manager and Structural Engineer', 'Civil- and Structural Design and Project Management', 'Client'),
('Marina Mall', '2017', 'Accra', 'Nestle', '8-storey building', 'Structural Engineer', 'Re-calculation the structures regarding to earthquake (3D-modeling)', 'Client'),
('Design and Construction of 5 No. Townhouses', '2018', 'Accra, Ghana', 'Private', 'Structural Design', 'Structural and Civil Engineer', 'Design only', 'Private'),
('Technical advisor to GIZ', '2018', 'Accra, Ghana', 'GIZ, Government of Germany', 'E-Waste Training School and Football Pitch', 'Technical advisor and Civil Engineer', 'Design and Supervision of Football pitch, Technical advisor on training school', 'Client'),
('New Factory in Accra', '2018/19', 'Accra, Ghana', 'MC Bauchemie', 'Steel-structure and external works', 'Project Manager, Design and supervision', 'Project Management, Supervision, Civil and Structural Design', 'Client'),
('Refurbishment of LMI Holdings Head Office', '2018/20', 'Accra, Ghana', 'LMI Holdings', 'Refurbishing head office', 'Project Manager', 'Project Management, Supervision, Entire Design', 'Client'),
('Murphy Homes', '2018', 'Tema, Ghana', 'Private', '700 Houses', 'Project Manager', 'Project Management advice, Procurement advice', 'Client'),
('Mega-Warehouse at Free zone in Tema', '2018/19', 'Tema, Ghana', 'IWC', 'Masterplan and Logistics for Mega warehouse, Design advice', 'Technical Advisor', 'Project Management Advise, Structural Design', 'Client'),
('Maritime Training School', '2018/20', 'Nungua, Ghana', 'SGSM', 'Training School, 2-3 storey steel structure close to Atlantic Ocean; 3,200m2 floor area', 'Project Manager and Structural Engineer', 'Project Management, Civil and Structural Design only', 'Client'),
('Office building - 12 storey and two underground parking storey', '2019- ongoing', 'Accra, Ghana', 'FreRox Communication Ltd.', 'Retail/Office building', 'Project Manager and Structural Engineer', 'Project Management, Civil and Structural Design', 'Client'),
('Construction of a locker room at the Factory for Nestle Ghana Ltd.', '2020', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Refurbishment and Extension of existing building (Locker rooms)', 'Project Management, Architectural and structural design', 'Design', 'Client'),
('Extension of existing warehouse for Nestle Ghana Ltd.', '2020', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Preliminary design of Extension (3500m2, 15m high) of the existing warehouse including 200m access road, new access solution for the entire warehouse, redesign of inbound and outbound area', 'Lead Consultant', 'Architectural, Structural and civil design; Bill of Quantities', 'Client'),
('Extension of existing Instant Cereal Factory for Nestle Ghana Ltd.', '2020', 'Tema, Ghana', 'Nestle Ghana Ltd.', 'Preliminary design of Extension (1900m2, 20m high) of the existing building, 4 storey', 'Lead Consultant', 'Architectural and Structural design; Bill of Quantities', 'Client'),
('COVID 19 - Improvement of Sanitary facilities and access to drinking water in Agbogbloshie', '2020/21', 'Accra, Ghana', 'GIZ, Government of Germany', 'Proposal of different approaches to the existing shortfalls, Design and supervision', 'Lead Consultant', 'Design; Bill of Quantities, Tender documents, supervision', 'Client'),
('E-Waste Program - Extension of training facilities and improve contaminated areas', '2020/21', 'Accra, Ghana', 'GIZ, Government of Germany', 'Proposal of different approaches for training fascility, tree planting program', 'Lead Consultant, design and supervision', 'Entire Design; Bill of Quantities, Tender documents, supervision', 'Client'),
('Construction of a Recycling Plant', '2020', 'Tema, Ghana', 'REpatern', 'Plastic Recycling Plant 150x70m', 'Advising Engineer', 'Concept design and budget for the project', 'Client'),
('Construction of a Green Building (Zero-Net) for Energy Commission', '2020/23', 'Accra, Ghana', 'GIZ, Government of Germany', 'Design and Construction of a low Energy building', 'Clients Representative', 'Advise on all Project Phases', 'Client'),
('Dormitory in Ho, Phase 1', '2020/21', 'Ho, Ghana', 'Government of Italy', '800m2 single storey building with external works', 'Project Management', 'Design only', 'Client'),
('Day Care Center for 100 children in Agbogbloshi', '2020 - 2024', 'Accra, Ghana', 'MISSIO and A Heart for Children', '7 single building in rammed earth, rain water collection, digester with sand filter, tree planting', 'Project Management', 'Entire Design; Bill of Quantities, Tender documents and supervision', 'Client'),
('Training Center for 50 Students in Agbogbloshi', '2020', 'Accra, Ghana', 'MISSIO', 'Storey building with Assembly hall and workshops rain water collection, digester with sand filter, tree planting', 'Project Management', 'Concept design', 'Client'),
('Construction of cold store (6,500m2) and office (3,8000m2) including reclaim of wet land (15,000m2)', '2020 - ongoing', 'Accra, Ghana', 'IZAKO Ltd.', 'Extensive earthworks (45,000. - m3), Retaining wall 250m, cold store 6500m2, office 4-storey 3,800m2', 'Project Management and Entire Design and design for 1km access road', 'Project Manager for entire Project, All Design; Bill of Quantities, Tender documents and supervision for a turn key project', 'Client'),
('Construction of the Clean room - Textile industry', '2020/22', 'Accra, Ghana', 'Ethical Apparel Africa', 'Cleanroom ISO7, ISO8 (310 m2), in existing factory', 'Project Management', 'Design; Bill of Quantities, Tender documents', 'Client'),
('Construction of E-waste Vocational Training School', '2020/21', 'Accra, Ghana', 'City Waste Recycling Limited', 'Training school building, 3,800m2 and 500m access road and parking area', 'Project Management', 'Concept Design and budget', 'Client'),
('Construction of Residential Apartments and Townhouses', '2021/24', 'Accra, Ghana', 'Bafla Limited', 'Development on 14,600m2 plot, 5 Nos. apart building 5-storey buildings and 19 Nos. Townhouses, pool area with Gym and all service equipment and external works and access road', 'Project Management, Structural- and Civil Engineer', 'Design; Bill of Quantities, Procurement and Supervision', 'Client'),
('Construction of 7 storey and 3-storey Apartment building/Clinic', '2021- ongoing', 'Accra, Ghana', 'Bafla Limited', 'Development on 6,200m2 plot', 'Project Management', 'Conceptual Design', 'Client'),
('Construction of Residential Apartments and Townhouses', '2020', 'Akosombo, Ghana', 'Bafla Limited', 'Development on 130 acres greenfield, with 2 Nos. Apartment buildings and 62 luxurious houses, extensive landscaping and all civil works', 'Project Management and Engineering', 'Concept design of development', 'Client'),
('Construction of a 4-Storey Hospital - Nephrology and Urology', '2021/22', 'Accra, Ghana', 'Vamed', 'New hospital (7,200m2) with external works', 'Structural/Civil Engineer', 'Design, Bill of Quantities and Supervision of Structural- and Civil works', 'Client'),
('Construction of a 4 Star Hotel and Residential Apartments', '2021', 'Winneba, Ghana', 'Private', '60 room hotel with a conference facility at the beach (8.5acrs) including external works and access road', 'Project Management', 'Concept design and Budget', 'Client'),
('Construction of cold store (1,200m2) and office (200m2) including external works', '2022', 'Takoradi, Ghana', 'IZAKO Ltd.', 'Cold store 4200m2, office 2-storey 200m2, external works', 'Project Management and Structural- and Civil design', 'Concept design and budget', 'Client'),
('Construction of an apartment building in Kaneshie, Accra', '2024', 'Accra, Ghana', 'Bafla Ltd.', '5-storey building, footprint 250m2', 'Project Management and Structural- and Civil design', 'Concept design', 'Client'),
('Construction of an apartment building in Dzorwulu, Accra', '2022 - ongoing', 'Accra, Ghana', 'Private', '5-storey building, foot print 450m2 (14 apartments with underground parking)', 'Project Management and Entire design', 'Project Manager for entire Project, Entire Design; Bill of Quantities, Tender documents, procurement and supervision', 'Client')
ON CONFLICT DO NOTHING;
