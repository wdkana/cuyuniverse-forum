<?php

return [

    /**
     * Application Name.
     */
    'application_name' => 'Your Application',

    /**
     * Client ID.
     */
    'client_id' => env('GOOGLE_CLIENT_ID', null),

    /**
     * Client Secret.
     */
    'client_secret' => env('GOOGLE_CLIENT_SECRET', null),

    /**
     * Access Type
     */
    'access_type' => 'offline',

    /**
     * Approval Prompt
     */
    'approval_prompt' => 'auto',

    /**
     * Scopes.
     */
    'scopes' => [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtube.readonly'
    ],

    /**
     * Developer key.
     */
    'developer_key' => env('GOOGLE_DEVELOPER_KEY', null),

    /**
     * Route URI's
     */
    'routes' => [

        /**
         * The prefix for the below URI's
         */
        'prefix' => 'youtube',

        /**
         * Redirect URI
         */
        'redirect_uri' => 'callback',

        /**
         * The autentication URI
         */
        'authentication_uri' => 'auth',

    ]

];