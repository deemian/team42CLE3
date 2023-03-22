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
                1 => [
                    "id" => 11,
                    "name" => "Iemand in gevaar",
                ],
                2 => [
                    "id" => 12,
                    "name" => "Acuut medische zorg nodig",
                ],
                3 => [
                    "id" => 13,
                    "name" => "Ernstig Ongeluk",
                ],
            ],
        ],
        2 => [
            "id" => 2,
            "name" => "Police",
            "options" => [
                1 => [
                    "id" => 21,
                    "name" => "Lijk",
                ],
                2 => [
                    "id" => 22,
                    "name" => "Overval",
                ],
                3 => [
                    "id" => 23,
                    "name" => "Gijzeling",
                ],
                4 => [
                    "id" => 24,
                    "name" => "Mishandeling",
                ],
                5 => [
                    "id" => 25,
                    "name" => "Steekpartij",
                ],
                6 => [
                    "id" => 26,
                    "name" => "Overig",
                ],
            ],
        ],
        3 => [
            "id" => 3,
            "name" => "Firefighters",
            "options" => [
                1 => [
                    "id" => 31,
                    "name" => "Brand",
                ],
                2 => [
                    "id" => 32,
                    "name" => "Ieamand zit vast",
                ],
                3 => [
                    "id" => 33,
                    "name" => "Gaslek",
                ],
                4 => [
                    "id" => 34,
                    "name" => "Bosbrand",
                ],
            ],
        ]
    ];

    return $details[$id];
}