<?php

// Rate limit per minute
return [
    'post' => env('RATE_LIMIT_POST', 3),
    'comment' => env('RATE_LIMIT_COMMENT', 3),
];
