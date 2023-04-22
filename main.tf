provider "azurerm" {
  features {}
}

resource "azurerm_app_service_plan" "plan" {
  name                = "example-appserviceplan"
  location            = "East US"
  resource_group_name = "Grupo-02"
  sku {
    tier = "Standard"
    size = "S1"
  }
}

resource "azurerm_app_service" "nodejs" {
  name                = "BackendGrupo02"
  location            = "East US"
  resource_group_name = "Grupo-02"
  app_service_plan_id = azurerm_app_service_plan.plan.id

  site_config {
    always_on = true

    app_settings = {
      "WEBSITE_NODE_DEFAULT_VERSION" = "10.14.1"

      "WEBSITE_RUN_FROM_PACKAGE"     = "1"
    }
  }
}

output "app_service_url" {
  value = "https://${azurerm_app_service.nodejs.default_site_hostname}"
}
