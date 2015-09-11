# suite-integration-js

Suite Integration JS (SIJS) is an API providing methods of communication between Suite and integrated services running in an iframe. One can send post messages out of the iframe and SIJS will handle those requests if there is a handler for.

__General message format__

```
{
  "event": "handler",
  "some_key": "data",
  "source": {
    "integration_id": "some_integration",
    "integration_instance_id": "iframe's random id"
  }
}
```

__Fields__

|Field|Role|Mandatory|
|-----|----|---------|
|event|Name of the handler to pass the message to.|YES|
|some_key|Arbitrary data the handler needs to work properly.|
|source|This is a signature marking where the message came from. Every integration has an ID (eg. content-editor) and every integration iframe instance has an instance ID (a sufficiently large random number, actually).     Though not all message handlers do rely on _source_, it is best to always include it in your message.|MIXED|

# Message handlers available

## Alert

This handler will render a sticky e-alert box on top of the page and remove it after a timeout has elapsed.

__Message format__

```
{
  "event": "alert",
  "text": "Error saving content",
  "icon": "circle-exclamation",
  "className": "e-alert-danger",
  "timeout": "5000"
}
```

__Fields__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|text|Name of the handler to pass the message to.|YES|
|icon|Icon class of the icon to be rendered on the left side of the alert. Eg. 'check' for a check mark or 'exclamation-circle' for an exclamation mark in a circle.|NO|
|className|Alert sub-class to use when rendering the alert. Eg. 'e-alert-success' for a green bar, 'e-alert-danger' for a red one.|NO|
|timeout|Amount of time the alert will fade out and get removed from the DOM after, in milliseconds.|NO|5000|

## Enable

This handler will remove the class _e-btn-disabled_ from a selection of DOM elements.

__Message format__

```
{
  "event": "enable",
  "selection": "#foo-id"
}
```

__Fields__

|Field|Role|Mandatory|
|-----|----|---------|
|selection|jQuery selection.|YES|

## Modal

This handler will open a modal dialog with content provided by your service rendered in an iframe inside the modal. The handler will generate a new integration instance ID and glue integration_id, integration_instance_id and opener_integration_instance_id the URL.

__Message format__

```
{
  "event": "modal",
  "src": "some-url-in-your-service",
  "width": 500,
  "height": 200,
  "source": {
    "integration_id": "some_integration",
    "integration_instance_id": "12345"
  }
}
```

__Fields__

|Field|Role|Mandatory|Default|
|-----|----|---------|-------|
|src|An URL where the markup of the modal content can be found.|YES||
|width|Width of the iframe we'll include in the modal.|NO|650|
|height|Height of the iframe we'll include in the modal.|NO|500|
|source.integration_id|ID of the integration the message is coming from.|NO|
|source.integration_instance_id|Random instance ID of the integration the message is coming from.|YES|


__Query params auto-added__

|Param name|Role|
|----------|----|
|integration_id|Integration ID.|
|integration_instance_id|The new auto-generated instance ID.|
|opener_integration_instance_id|Instance ID of the integration the modal was opened by.|

## Modal:close

This handler will remove any _e-modal_ elements from the DOM.

__Message format__

```
{
  "event": "modal:close"
}
```

## Navigate

This handler will navigate the browser's main window to a prespecified URL. Target URLs are built using data passed in the message. Session ID is provided by the handler if needed.

__Message format__

```
{
  "event": "navigate",
  "target": {
    "pathname": "some/prespecified/path",
    "param_foo": "foo_indeed"
  }
}
```

__Fields__

|Field|Role|Mandatory|
|-----|----|---------|
|target.pathname|The prespecified target you would like to head to.|YES|
|target.param_foo|The general param the actual target needs.|MIXED|

__Path names available__

|Target|Action|Params|
|------|------|------|
|email_campaigns/list|Will head to the campaign list.||
|email_campaigns/edit|Will open the editor with the campaign set.|campaign_id|
|email_analysis/list|Will head to reporting.||
|email_analysis/details|Will head to reporting details of a campaign.|campaign_id, launch_id|

## Proxy

This handler will forward a message to another integration iframe.

__Message format__

```
{
  "event": "proxy",
  "envelope": {
    "some_key": "data"
  },
  "integrationInstanceId": "9876"
}
```

__Fields__

|Field|Role|Mandatory|
|-----|----|---------|
|envelope|The message passed to the recipient iframe.|NO|
|integrationInstanceId|The random ID of the integration you would like to send the message to.|YES|

## Refresh

This handler will reload the actual browser window.

__Message format__

```
{
  "event": "refresh"
}
```

## Resize

This handler will resize the iframe the message came from.

__Message format__

```
{
  "event": "resize",
  "height": 100,
  "source": {
    "integration_id": "some_integration",
    "integration_instance_id": "12345"
  }
}
```

__Fields__

|Field|Role|Mandatory|
|-----|----|---------|
|height|The iframe's desired height.|YES|
|source.integration_id|ID of the integration the message is coming from.|NO|
|source.integration_instance_id|Random instance ID of the integration the message is coming from.|YES|
