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
            "image" => "AmbulanceIcon.png"
        ],
        [
            "id" => 2,
            "name" => "Police",
            "image" => "politieIcon.png"
        ],
        [
            "id" => 3,
            "name" => "Firefighters",
            "image" => "brandweerIcon.png"
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