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
        ],
        2 => [
            "id" => 2,
            "name" => "Police",
        ],
        3 => [
            "id" => 3,
            "name" => "Firefighters",
        ]
    ];

    return $details[$id];
}