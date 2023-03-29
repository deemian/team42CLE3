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
            "name" => "Police",
        ],
        [
            "id" => 3,
            "name" => "Firefighters",
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
            "name" => "Police",
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
            "name" => "Firefighters",
            "options" => [
                [
                    "id" => 31,
                    "name" => "Brand",
                ],
                [
                    "id" => 32,
                    "name" => "Ieamand zit vast",
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
            // objects
        ],
        12 => [
            // objects
        ],
        13 => [
            // objects
        ],
        21 => [
            // objects
        ],
        22 => [
            // objects
        ],
        23 => [
            // objects
        ],
        24 => [
            // objects
        ],
        25 => [
            // objects
        ],
        26 => [
            // objects
        ],
        31 => [
            // objects
        ],
        32 => [
            // objects
        ],
        33 => [
            // objects
        ],
        34 => [
            // objects
        ]
    ];

    return $details[$id];
}