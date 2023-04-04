<?php
/**
 * @return array
 */
function getData()
{
    return [
        [
            "id" => 1,
            "name" => "Ambulance",
        ],
        [
            "id" => 2,
            "name" => "Politie",
        ],
        [
            "id" => 3,
            "name" => "Brandweer",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getDataDetails($id)
{
    $details = [
        1 => [
            "id" => 1,
            "name" => "Ambulance",
            "options" => [
                [
                    "id" => 11,
                    "name" => "Iemand in gevaar",
                ],
                [
                    "id" => 12,
                    "name" => "Acuut medische zorg nodig",
                ],
                [
                    "id" => 13,
                    "name" => "Ernstig Ongeluk",
                ]
            ]
        ],
        2 => [
            "id" => 2,
            "name" => "Politie",
            "options" => [
                [
                    "id" => 21,
                    "name" => "Lijk",
                ],
                [
                    "id" => 22,
                    "name" => "Overval",
                ],
                [
                    "id" => 23,
                    "name" => "Gijzeling",
                ],
                [
                    "id" => 24,
                    "name" => "Mishandeling",
                ],
                [
                    "id" => 25,
                    "name" => "Steekpartij",
                ],
                [
                    "id" => 26,
                    "name" => "Overig",
                ]
            ]
        ],
        3 => [
            "id" => 3,
            "name" => "Brandweer",
            "options" => [
                [
                    "id" => 31,
                    "name" => "Brand",
                ],
                [
                    "id" => 32,
                    "name" => "Iemand zit vast",
                ],
                [
                    "id" => 33,
                    "name" => "Gaslek",
                ],
                [
                    "id" => 34,
                    "name" => "Bosbrand",
                ]
            ]
        ],
        11 => [
            "id" => 11,
            "name" => "Iemand in gevaar",
            "options" => "send"
        ],
        12 => [
            "id" => 12,
            "name" => "Acuut medische zorg nodig",
            "options" => "send"
        ],
        13 => [
            "id" => 13,
            "name" => "Ernstig Ongeluk",
            "options" => "send"
        ],
        21 => [
            "id" => 21,
            "name" => "Lijk",
            "options" => "send"
        ],
        22 => [
            "id" => 22,
            "name" => "Overval",
            "options" => "send"
        ],
        23 => [
            "id" => 23,
            "name" => "Gijzeling",
            "options" => "send"
        ],
        24 => [
            "id" => 24,
            "name" => "Mishandeling",
            "options" => "send"
        ],
        25 => [
            "id" => 25,
            "name" => "Steekpartij",
            "options" => "send"
        ],
        26 => [
            "id" => 26,
            "name" => "Overig",
            "options" => "send"
        ],
        31 => [
            "id" => 31,
            "name" => "Brand",
            "options" => "send"
        ],
        32 => [
            "id" => 32,
            "name" => "Iemand zit vast",
            "options" => "send"
        ],
        33 => [
            "id" => 33,
            "name" => "Gaslek",
            "options" => "send"
        ],
        34 => [
            "id" => 34,
            "name" => "Bosbrand",
            "options" => "send"
        ]
    ];

    return $details[$id];
}