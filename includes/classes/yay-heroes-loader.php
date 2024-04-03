<?php
require_once(dirname(__FILE__) . '/class-heroes.php');
class YayHeroesLoader
{
    protected static $instance = null;

    private function __construct()
    {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('wp_print_scripts', array($this, 'render_refresh_runtime'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_heroes_app'));
        add_filter('script_loader_tag', array($this, 'load_script_module'), 10, 2);
        add_action('wp_enqueue_scripts', array($this, 'localize_heroes_script'));
        add_action('admin_enqueue_scripts', array($this, 'localize_heroes_script'));
    }

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }


    public function render_refresh_runtime()
    {
        $content = '<script type="module">
        import RefreshRuntime from "http://localhost:3000/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>';

        echo $content;
    }

    public function add_admin_menu()
    {
        add_menu_page(
            'Yay Heroes',
            'Yay Heroes',
            'administrator',
            'yay-heroes-settings',
            array($this, 'show_admin_settings_page')
        );
    }

    public function show_admin_settings_page()
    {
        echo '<div id="yay-heroes-app"></div>';
    }

    public function enqueue_heroes_app()
    {
        wp_enqueue_script('yay_heroes/module/admin_page', 'http://localhost:3000/src/main.tsx', [], null);
    }

    public function load_script_module($tag, $handle)
    {
        if ($handle === 'yay_heroes/module/admin_page') {
            if (strpos($tag, 'type="') !== false) {
                return preg_replace('/\stype="\S+\s/', ' type="module" ', $tag, 1);
            } else {
                return str_replace(' src=', ' type="module" src=', $tag);
            }
        }
        return $tag;
    }

    public function localize_heroes_script()
    {
        $heroes = new Heroes();
        wp_localize_script('yay_heroes/module/admin_page', 'yayHeroes', [
            'allHeroes' => $heroes->get_all_heroes(),
            'api_url' => get_rest_url(),
            'api_nonce' => wp_create_nonce('wp_rest')
        ]);
    }
}
