'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-starter-app-seven documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApiModule.html" data-type="entity-link">ApiModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ApiModule-b844958f1ec10de6655f84a1870e2240"' : 'data-target="#xs-injectables-links-module-ApiModule-b844958f1ec10de6655f84a1870e2240"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApiModule-b844958f1ec10de6655f84a1870e2240"' :
                                        'id="xs-injectables-links-module-ApiModule-b844958f1ec10de6655f84a1870e2240"' }>
                                        <li class="link">
                                            <a href="injectables/ErrorNotification.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ErrorNotification</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GlobalErrorHandler.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GlobalErrorHandler</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' : 'data-target="#xs-components-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' :
                                            'id="xs-components-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' : 'data-target="#xs-injectables-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' :
                                        'id="xs-injectables-links-module-AppModule-d7505d2ffee3e69131d18d67a69119ab"' }>
                                        <li class="link">
                                            <a href="injectables/ConstantParsingService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ConstantParsingService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BulkUploadModule.html" data-type="entity-link">BulkUploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BulkUploadModule-28ca2052479c29c1f2d5e20b5dffda93"' : 'data-target="#xs-components-links-module-BulkUploadModule-28ca2052479c29c1f2d5e20b5dffda93"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BulkUploadModule-28ca2052479c29c1f2d5e20b5dffda93"' :
                                            'id="xs-components-links-module-BulkUploadModule-28ca2052479c29c1f2d5e20b5dffda93"' }>
                                            <li class="link">
                                                <a href="components/BulkUploadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BulkUploadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecordErrorRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecordErrorRendererComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BulkUploadRoutingModule.html" data-type="entity-link">BulkUploadRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CachingModule.html" data-type="entity-link">CachingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ContactsModule.html" data-type="entity-link">ContactsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ContactsModule-6ff74180abffdf5a481ed7b2b10858d6"' : 'data-target="#xs-components-links-module-ContactsModule-6ff74180abffdf5a481ed7b2b10858d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContactsModule-6ff74180abffdf5a481ed7b2b10858d6"' :
                                            'id="xs-components-links-module-ContactsModule-6ff74180abffdf5a481ed7b2b10858d6"' }>
                                            <li class="link">
                                                <a href="components/AddEditContactComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddEditContactComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormFieldComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormFieldComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContactsRoutingModule.html" data-type="entity-link">ContactsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-329d3ebed767d2c76854aa01e8f06fa2"' : 'data-target="#xs-components-links-module-HomeModule-329d3ebed767d2c76854aa01e8f06fa2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-329d3ebed767d2c76854aa01e8f06fa2"' :
                                            'id="xs-components-links-module-HomeModule-329d3ebed767d2c76854aa01e8f06fa2"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeRoutingModule.html" data-type="entity-link">HomeRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/KeycloakModule.html" data-type="entity-link">KeycloakModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-KeycloakModule-0d9afcabe8500bacde0136e606b73ce5"' : 'data-target="#xs-injectables-links-module-KeycloakModule-0d9afcabe8500bacde0136e606b73ce5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-KeycloakModule-0d9afcabe8500bacde0136e606b73ce5"' :
                                        'id="xs-injectables-links-module-KeycloakModule-0d9afcabe8500bacde0136e606b73ce5"' }>
                                        <li class="link">
                                            <a href="injectables/KeycloakService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>KeycloakService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MasterFormModule.html" data-type="entity-link">MasterFormModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' : 'data-target="#xs-components-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' :
                                            'id="xs-components-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' }>
                                            <li class="link">
                                                <a href="components/MasterFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MasterFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' : 'data-target="#xs-injectables-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' :
                                        'id="xs-injectables-links-module-MasterFormModule-5a7849d35b6714a6ab8ebbc8e3cb1660"' }>
                                        <li class="link">
                                            <a href="injectables/FormNotification.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>FormNotification</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MasterFormService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MasterFormService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MasterFormStylingModule.html" data-type="entity-link">MasterFormStylingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationModule.html" data-type="entity-link">NavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NavigationModule-7f9edb79fa757dedb5709d3367a8fafc"' : 'data-target="#xs-components-links-module-NavigationModule-7f9edb79fa757dedb5709d3367a8fafc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationModule-7f9edb79fa757dedb5709d3367a8fafc"' :
                                            'id="xs-components-links-module-NavigationModule-7f9edb79fa757dedb5709d3367a8fafc"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidenavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopnavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TopnavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationStylingModule.html" data-type="entity-link">NavigationStylingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SdkModule.html" data-type="entity-link">SdkModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-9952cf69b4db80ccab7ccbe4be2a51fb"' : 'data-target="#xs-components-links-module-SharedModule-9952cf69b4db80ccab7ccbe4be2a51fb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-9952cf69b4db80ccab7ccbe4be2a51fb"' :
                                            'id="xs-components-links-module-SharedModule-9952cf69b4db80ccab7ccbe4be2a51fb"' }>
                                            <li class="link">
                                                <a href="components/EditButtonRenderer.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditButtonRenderer</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StylingModule.html" data-type="entity-link">StylingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TableModule.html" data-type="entity-link">TableModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TableModule-25b9549a15c7442a0743aa60bda3f4f4"' : 'data-target="#xs-components-links-module-TableModule-25b9549a15c7442a0743aa60bda3f4f4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableModule-25b9549a15c7442a0743aa60bda3f4f4"' :
                                            'id="xs-components-links-module-TableModule-25b9549a15c7442a0743aa60bda3f4f4"' }>
                                            <li class="link">
                                                <a href="components/DataTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DataTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginatorComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PaginatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableStylingModule.html" data-type="entity-link">TableStylingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#directives-links"' :
                                'data-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/CreditCardValidator.html" data-type="entity-link">CreditCardValidator</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Cache.html" data-type="entity-link">Cache</a>
                            </li>
                            <li class="link">
                                <a href="classes/cacheableItem.html" data-type="entity-link">cacheableItem</a>
                            </li>
                            <li class="link">
                                <a href="classes/CacheState.html" data-type="entity-link">CacheState</a>
                            </li>
                            <li class="link">
                                <a href="classes/CacheStateModel.html" data-type="entity-link">CacheStateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CDIState.html" data-type="entity-link">CDIState</a>
                            </li>
                            <li class="link">
                                <a href="classes/CDIStateModel.html" data-type="entity-link">CDIStateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Constant.html" data-type="entity-link">Constant</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConstantState.html" data-type="entity-link">ConstantState</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConstantStateModel.html" data-type="entity-link">ConstantStateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Contact.html" data-type="entity-link">Contact</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactState.html" data-type="entity-link">ContactState</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContactStateModel.html" data-type="entity-link">ContactStateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteCache.html" data-type="entity-link">DeleteCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/DisableNotification.html" data-type="entity-link">DisableNotification</a>
                            </li>
                            <li class="link">
                                <a href="classes/Email.html" data-type="entity-link">Email</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailId.html" data-type="entity-link">EmailId</a>
                            </li>
                            <li class="link">
                                <a href="classes/EmailIdsObj.html" data-type="entity-link">EmailIdsObj</a>
                            </li>
                            <li class="link">
                                <a href="classes/Emails.html" data-type="entity-link">Emails</a>
                            </li>
                            <li class="link">
                                <a href="classes/Employee.html" data-type="entity-link">Employee</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCache.html" data-type="entity-link">FetchCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchConstants.html" data-type="entity-link">FetchConstants</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchContacts.html" data-type="entity-link">FetchContacts</a>
                            </li>
                            <li class="link">
                                <a href="classes/FetchCountries.html" data-type="entity-link">FetchCountries</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidateCacheItems.html" data-type="entity-link">InvalidateCacheItems</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakState.html" data-type="entity-link">KeycloakState</a>
                            </li>
                            <li class="link">
                                <a href="classes/KeycloakStateModel.html" data-type="entity-link">KeycloakStateModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Link.html" data-type="entity-link">Link</a>
                            </li>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link">Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginFail.html" data-type="entity-link">LoginFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginSuccess.html" data-type="entity-link">LoginSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/Logout.html" data-type="entity-link">Logout</a>
                            </li>
                            <li class="link">
                                <a href="classes/Phone.html" data-type="entity-link">Phone</a>
                            </li>
                            <li class="link">
                                <a href="classes/Phones.html" data-type="entity-link">Phones</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetForm.html" data-type="entity-link">ResetForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetToken.html" data-type="entity-link">ResetToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchParams.html" data-type="entity-link">SearchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchParams-1.html" data-type="entity-link">SearchParams</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetCache.html" data-type="entity-link">SetCache</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetForm.html" data-type="entity-link">SetForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitForm.html" data-type="entity-link">SubmitForm</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateToken.html" data-type="entity-link">UpdateToken</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CacheStoreService.html" data-type="entity-link">CacheStoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CDIService.html" data-type="entity-link">CDIService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConstantsService.html" data-type="entity-link">ConstantsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactFormCreator.html" data-type="entity-link">ContactFormCreator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactsService.html" data-type="entity-link">ContactsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomAsyncValidators.html" data-type="entity-link">CustomAsyncValidators</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/CacheInterceptor.html" data-type="entity-link">CacheInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HeaderInjector.html" data-type="entity-link">HeaderInjector</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/TokenInterceptor.html" data-type="entity-link">TokenInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PendingChangesGuard.html" data-type="entity-link">PendingChangesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/PendingChangesGuard-1.html" data-type="entity-link">PendingChangesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/addResponse.html" data-type="entity-link">addResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColWidth.html" data-type="entity-link">ColWidth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentCanDeactivate.html" data-type="entity-link">ComponentCanDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ComponentCanDeactivate-1.html" data-type="entity-link">ComponentCanDeactivate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/fetchResponse.html" data-type="entity-link">fetchResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/keyTextValue.html" data-type="entity-link">keyTextValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SdkTableColumn.html" data-type="entity-link">SdkTableColumn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/updateResponse.html" data-type="entity-link">updateResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});