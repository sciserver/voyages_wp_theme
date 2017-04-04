<?php

	add_action( 'widgets_init', 'register_wpl_galaxy_wp_testimonials_widget' );
	
	function register_wpl_galaxy_wp_testimonials_widget() {
		register_widget( 'wpl_galaxy_wp_testimonials_widget' );
	}
	
	class wpl_galaxy_wp_testimonials_widget extends WP_Widget {
		
		function __construct() {
			$widget_ops = array( 'classname' => 'wproto-testimonials-widget', 'description' => __('A widget that displays the testimonials. ', 'wproto') );
		
			$control_ops = array( 'width' => 300, 'height' => 350, 'id_base' => 'wproto-testimonials-widget' );
		
			$this->WP_Widget( 'wproto-testimonials-widget', __( '&laquo;Galaxy&raquo; Testimonials', 'wproto' ), $widget_ops, $control_ops );
		}
		
		function widget( $args, $instance ) {
			global $wpl_galaxy_wp;
			
			$data = array();
			$data['title'] = apply_filters( 'widget_title', $instance['title'] );
			
			$data['instance'] = $instance;
			$data['args'] = $args;

			$wpl_galaxy_wp->view->load_partial( 'widgets/testimonials', $data );

		}
		
		function update( $new_instance, $old_instance ) {
			$instance = $old_instance;

			//Strip tags from title and name to remove HTML 
			$instance['title'] = strip_tags( str_replace( '\'', "&#39;", $new_instance['title'] ) );
			$instance['posts_count'] = isset( $new_instance['posts_count'] ) ? absint( $new_instance['posts_count'] ) : 1;
			$instance['display_categories'] = isset( $new_instance['display_categories'] ) ? strip_tags( $new_instance['display_categories'] ) : 'all';
			$instance['order_by'] = isset( $new_instance['order_by'] ) ? strip_tags( $new_instance['order_by'] ) : 'id';
			$instance['sort'] = isset( $new_instance['sort'] ) ? strip_tags( $new_instance['sort'] ) : 'DESC';
			$instance['display_photo'] = isset( $new_instance['display_photo'] ) ? absint( $new_instance['display_photo'] ) : 0;

			return $instance;
		}
		
		function form( $instance ) {
			
			//Set up some default widget settings.
			$defaults = array(
				'title' => __( 'Testimonials', 'wproto' ),
				'posts_count' => 5,
				'display_categories' => 'all',
				'order_by' => 'date',
				'sort' => 'DESC',
				'display_photo' => 1
			);
			
			$instance = wp_parse_args( (array) $instance, $defaults );
			
			?>
			<p>
				<label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e('Widget title:', 'wproto'); ?></label>
				<input class="widefat" type="text" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo $instance['title']; ?>" />
			</p>
			<p>
				<strong><?php _e('Displaying', 'wproto'); ?>:</strong>
			</p>
			<p>
				<input class="checkbox" value="1" type="checkbox" <?php checked( $instance['display_photo'] ); ?> id="<?php echo $this->get_field_id( 'display_photo' ); ?>" name="<?php echo $this->get_field_name( 'display_photo' ); ?>" />
				<label for="<?php echo $this->get_field_id( 'display_photo' ); ?>"><?php _e('Display photo', 'wproto'); ?></label>  
			</p>
			<p>
				<label for="<?php echo $this->get_field_id( 'posts_count' ); ?>"><?php _e('Number of items to display:', 'wproto'); ?></label>
				<input class="widefat" type="number" min="1" name="<?php echo $this->get_field_name( 'posts_count' ); ?>" id="<?php echo $this->get_field_id( 'posts_count' ); ?>" value="<?php echo $instance['posts_count']; ?>" />
			</p>
			<p>
				<label for="<?php echo $this->get_field_id( 'display_categories' ); ?>"><?php _e('Display from categories:', 'wproto'); ?></label>
				<select class="widefat" id="<?php echo $this->get_field_id( 'display_categories' ); ?>" name="<?php echo $this->get_field_name( 'display_categories' ); ?>">
					<option <?php echo $instance['display_categories'] == 'all' ? 'selected="selected"' : ''; ?> value="all"><?php _e( 'All categories', 'wproto'); ?></option>
					<?php
						$categories = get_terms( 'wproto_testimonials_category', array(
							'hide_empty' => 0
						));
						if( is_array( $categories ) && count( $categories ) > 0 ):
						foreach( $categories as $cat ):
					?>
					<option <?php echo $instance['display_categories'] == $cat->term_id ? 'selected="selected"' : ''; ?> value="<?php echo $cat->term_id; ?>"><?php echo $cat->name; ?></option>
					<?php
						endforeach;
						endif;
					?>
				</select>
			</p>
			<p>
				<label for="<?php echo $this->get_field_id( 'order_by' ); ?>"><?php _e('Order items by:', 'wproto'); ?></label>
				<select class="widefat" id="<?php echo $this->get_field_id( 'order_by' ); ?>" name="<?php echo $this->get_field_name( 'order_by' ); ?>">
					<option <?php echo $instance['order_by'] == 'id' ? 'selected="selected"' : ''; ?> value="id"><?php _e( 'ID', 'wproto' ); ?></option>
					<option <?php echo $instance['order_by'] == 'date' ? 'selected="selected"' : ''; ?> value="date"><?php _e( 'Date', 'wproto' ); ?></option>
					<option <?php echo $instance['order_by'] == 'modified' ? 'selected="selected"' : ''; ?> value="modified"><?php _e( 'Modified', 'wproto' ); ?></option>
					<option <?php echo $instance['order_by'] == 'title' ? 'selected="selected"' : ''; ?> value="title"><?php _e( 'Title', 'wproto' ); ?></option>
					<option <?php echo $instance['order_by'] == 'random' ? 'selected="selected"' : ''; ?> value="random"><?php _e( 'Random', 'wproto' ); ?></option>
					<option <?php echo $instance['order_by'] == 'menu' ? 'selected="selected"' : ''; ?> value="menu"><?php _e( 'Menu order', 'wproto' ); ?></option>
				</select>
			</p>
			<p>
				<label for="<?php echo $this->get_field_id( 'sort' ); ?>"><?php _e('Sort:', 'wproto'); ?></label>
				<select class="widefat" id="<?php echo $this->get_field_id( 'sort' ); ?>" name="<?php echo $this->get_field_name( 'sort' ); ?>">
					<option <?php echo $instance['sort'] == 'ASC' ? 'selected="selected"' : ''; ?> value="ASC"><?php _e( 'Ascending', 'wproto' ); ?></option>
					<option <?php echo $instance['sort'] == 'DESC' ? 'selected="selected"' : ''; ?> value="DESC"><?php _e( 'Descending', 'wproto' ); ?></option>
				</select>
			</p>
			<?php
		}
		
	}